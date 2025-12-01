---
title: Chain-of-Visual-Thought (CoVT) 기술 분석
date: '2025-12-01 10:24:34'
author: j-ho
tags: AI
categories: WIKI
---

> "이 글은 UC Berkeley와 UCLA 연구진이 발표한 논문 **"Chain-of-Visual-Thought: Teaching VLMs to See and Think Better with Continuous Visual Tokens"** 를 토대로 작성되었습니다."

최근 대형 언어 모델(LLM)의 추론 능력을 비약적으로 끌어올린 일등 공신은 단연 '생각의 사슬(Chain-of-Thought, CoT)' 기법입니다. 복잡한 문제를 단계별로 쪼개어 해결하는 이 방식은 강력했지만, Vision-Language Model(VLM) 분야에서는 뚜렷한 한계에 부딪혔습니다. "사과가 몇 개지?", "책상 뒤에 가려진 건 뭐지?" 같은 시각적 인식(Perception) 문제를 풀 때, 텍스트만으로는 이미지의 풍부한 공간적·기하학적 정보를 모두 담아내기 어려웠기 때문입니다.

오늘 소개할 논문 **"Chain-of-Visual-Thought: Teaching VLMs to See and Think Better with Continuous Visual Tokens"** 는 이러한 제약을 넘어서기 위한 새로운 시도입니다. UC Berkeley와 UCLA 연구진은 텍스트뿐만 아니라 **'연속적인 시각 토큰(Continuous Visual Tokens)'** 을 활용해 모델이 시각적으로 사고하게 만드는 'CoVT' 프레임워크를 제안합니다.

![iamge1](1.jpg)

<br />

## 1. 문제의식: 언어 병목 현상 (Language Bottleneck)

기존 VLM의 CoT 방식은 시각 정보를 억지로 텍스트 공간(Discrete Text Space)에 끼워 맞추는 식이었습니다. 예를 들어, 물체의 위치 관계를 파악할 때 "A는 왼쪽에, B는 뒤에 있다"라고 텍스트로 먼저 변환한 뒤 추론을 시작하는 것이죠.

이 과정에서 필연적으로 **'언어 병목(Language Bottleneck)'** 이 발생합니다.

- **정보 손실**: 이미지의 엣지(Edge), 깊이(Depth), 세밀한 분할(Segmentation) 정보 등은 텍스트로 온전히 표현하기 힘듭니다.
- **오류 누적**: 첫 단추인 텍스트 변환 과정에서 시각적 정보를 잘못 해석하면, 이후 논리가 아무리 정교해도 결국 오답을 내게 됩니다.

CoVT는 모델이 **'시각적 사고(Visual Thought)'** 를 할 수 있도록, 추론 과정에서 텍스트 토큰과 함께 시각 정보를 담은 토큰을 함께 생성하는 방식으로 이 문제를 해결합니다.

<br />

## 2. 핵심 원리: 연속적 시각 토큰 (Continuous Visual Tokens)

CoVT의 가장 흥미로운 점은 추론 과정(Thinking Process)에서 생성되는 토큰이 단순한 텍스트가 아닌, **압축된 시각적 잠재 표현(Compact Latent Representations)** 이라는 것입니다.

연구진은 인간의 시각 인지 과정을 모방해 4가지 핵심 시각 능력을 정의하고, 이를 **경량화된 비전 전문가(Lightweight Vision Experts)** 모델들로부터 추출(Distillation)해 VLM에 가르쳤습니다.

### **4가지 시각 토큰과 전문가 모델**

CoVT는 VLM이 다음 4가지 유형의 시각 토큰을 순차적(Autoregressive)으로 예측하도록 학습합니다

**1. Segmentation Tokens (객체 인식 및 2D 공간):**

- **역할**: 물체가 어디에 있고 어떤 모양인지 파악합니다.
- **교사 모델**: **SAM (Segment Anything Model)**
- **작동 방식**: 생성된 토큰은 SAM Decoder의 프롬프트로 입력되어 마스크(Mask)를 복원하는 데 쓰입니다.

**2. Depth Tokens (3D 공간 관계):**

- **역할**: 픽셀 단위의 원근감과 깊이 정보(앞/뒤 관계)를 이해합니다.
- **교사 모델**: **DepthAnything v2**
- **작동 방식**: 토큰이 DepthAnything의 인코더 특징과 결합하여 깊이 맵(Depth Map)을 재구성합니다.

**3. Edge Tokens (구조 및 기하학):**

- **역할**: 물체의 경계선과 전체적인 구조적 단서를 잡아냅니다.
- **교사 모델**: **PIDINet**
- **작동 방식**: 1x1 Convolution 커널을 거쳐 엣지 맵을 복원합니다.

**4. Semantic Tokens (의미적 이해):**

- **역할**: 이미지의 패치(Patch) 수준에서 의미론적 특징을 파악합니다.
- **교사 모델**: **DINOv2**
- **작동 방식**: DINO의 특징 벡터(Feature)와 직접 정렬(MSE Loss)되어 의미를 학습합니다.

<br />

## 3. 모델 아키텍처 및 학습 파이프라인

CoVT는 실제 추론 시에는 무거운 외부 도구(External Tools)를 호출하지 않습니다. 대신 학습 단계에서 외부 전문가 모델의 능력을 VLM의 파라미터 안에 **녹여내는(Internalize)** 방식을 택했습니다. 이를 위해 **"Think -> Decode -> Reconstruct"** 구조를 따릅니다.

#### **정렬 전략 (Alignment Strategy)**

획일적으로 특징 벡터값을 맞추기보다는, 전문가 모델마다 가장 효과적인 학습 방식을 따로 적용했습니다.

- **Task-Oriented Alignment**: SAM이나 DepthAnything처럼 결과물의 디테일이 중요한 경우, VLM이 생성한 토큰을 **Decoder의 프롬프트**로 활용해 최종 결과물(마스크, 깊이 맵)을 만들고, 이를 정답 데이터(Ground Truth)와 비교합니다.
- **Feature Alignment**: DINO처럼 표현 학습이 핵심인 모델은 특징 벡터 공간에서의 유사도를 좁히는 방식으로 학습합니다.

#### **4단계 학습 과정 (Four-Stage Training)**

모델이 시각적으로 '생각'하는 법을 체득하도록 커리큘럼 학습을 적용했습니다.

1. **Comprehension (이해)**: 시각 토큰이 무엇을 의미하는지 배우는 기초 단계입니다.
2. **Generation (생성)**: 주어진 이미지에 맞는 정확한 시각 토큰을 생성하도록 훈련합니다.
3. **Reasoning (추론)**: 질문에 답하는 과정(Chain-of-Thought) 속에 시각 토큰을 자연스럽게 섞어 쓰도록 합니다.
4. **Efficient Reasoning (효율적 추론)**: 시각 토큰 일부를 무작위로 제거(Drop)해도 남은 정보로 강건하게 추론하도록 학습시켜 효율성을 높이고 과적합을 방지합니다.

<br >

## 4. CoVT의 기술적 강점

- **해석 가능한 시각적 사고 (Interpretable Visual Thinking)** 기존의 Latent Reasoning 모델들은 내부 동작이 '블랙박스'에 가까웠습니다. 반면 CoVT는 생성된 시각 토큰을 디코더에 통과시켜 사람이 직관적으로 볼 수 있는 이미지(Segmentation Mask, Depth Map 등) 로 복원해 줍니다. 모델이 "이 물체가 앞에 있으니(Depth), 이것을 가리켜야겠다(Mask)"라고 판단하는 과정을 눈으로 확인할 수 있다는 뜻입니다.

- **외부 도구가 필요 없는 효율성 (Self-Contained)** 실제 Inference 단계에서는 무거운 비전 모델들을 로드할 필요가 없습니다. VLM은 학습된 가중치만으로 연속적인 시각 토큰 공간에서 가볍게 추론을 수행합니다. 시각화가 필요한 순간에만 선택적으로 디코딩하면 되므로 연산 효율이 매우 뛰어납니다.

- **확실한 성능 향상 CoVT는 CV-Bench, MMVP, RealWorldQA** 등 주요 벤치마크에서 Qwen2.5-VL 등 기존 모델을 상회하는 성능을 입증했습니다. 특히 **깊이(Depth) 추정이나 개수 세기(Counting)** 처럼 텍스트만으로는 한계가 있던 세밀한 시각 작업에서 괄목할 만한 성과를 보였습니다.

<br />

## 5. 결론

Chain-of-Visual-Thought는 VLM이 텍스트라는 이산적(Discrete) 상징의 한계를 넘어, **이미지의 물리적·공간적 특성을 '마음속으로 시뮬레이션(Mental Imagery)'하며 추론하는 단계**로 진화했음을 보여줍니다.

연속적(Continuous)인 시각 토큰을 사고의 도구로 내재화했다는 점은, 향후 진정한 의미의 멀티모달 AGI를 향한 연구에 중요한 이정표가 될 것입니다.

---

[참고 자료]
~

- Qin et al., "Chain-of-Visual-Thought: Teaching VLMs to See and Think Better with Continuous Visual Tokens", arXiv:2511.19418, 2025.
- 논문 링크: [https://arxiv.org/abs/2511.19418](https://arxiv.org/abs/2511.19418)

```toc

```
