# ReactJS 마스터 클래스

## Styled Components

[styled-components](https://styled-components.com/)

### Why Styled Components

- 스타일 컴포넌트를 사용하지 않으면 스타일링을 하는 방법들
  1. 컴포넌트 안에 HTML의 속성으로 스타일을 직접 지정하는 방법
     - ☹️ 태그형태로 추가할 경우, 기존의 CSS 스타일링 문법을 100% 활용할수 없다는 점이 있음
  2. 글로벌 CSS를 임포트 하는 방법
     - ☹️ 글로벌 CSS에 정의한 모든 항목이 의도치 않게 적용될 수 있음
  3. CSS 모듈링을 이용하여 클래스명을 지정하는 방법 👍
     - 😊 React에서 클래스명을 랜덤하게 지정해줘서 충돌을 예방함
     - ☹️ className을 원하는 곳에 계속해서 복사 붙여넣기 해야함

### Our First Styled Component

```bash
# 기본 폴더에서 CRA를 통해서 React 프로젝트를 생성 후에, styled components를 인스톨
npx create-react-app .
npm install styled-components
npm start
```

- Styled Component를 사용하기 전에 직접 정의하는 방식을 먼저 사용해본 뒤에 비교분석을 시도해보자

  ```jsx
  function App() {
    return (
      <div style={{ display: 'flex' }}>
        <div style={{ backgroundColor: 'teal', width: 100, height: 100 }}>
          <span style={{ color: 'white' }}>Hello, World!</span>
        </div>
        <div style={{ backgroundColor: 'tomato', width: 100, height: 100 }}></div>
      </div>
    );
  }

  export default App;
  ```

  - 상기 코드는 React에서 사용가능한 HTML태그에 직접 스타일을 지정하는 방식인데, 모든 엘리먼트가 div로 되어 있기 때문에, 어떤 스타일을 지정하는지 직접 style 코드를 보고 해석을 해야 알수가 있음
  - 스타일 컴포넌트에서는 컴포넌트를 먼저 작성한 뒤에 스타일을 지정하므로, 컴포넌트의 이름을 커스터마이징 가능하고 코드를 읽는데 더 도움을 줄 수 있게 됨 (직관성이 증가)

- Styled Component를 이용해서 리팩토링 (상기 코드와 결과는 동일)

  ```jsx
  import styled from 'styled-components';

  const Container = styled.div`
    display: flex;
  `;

  const BoxOne = styled.div`
    background-color: teal;
    width: 100px;
    height: 100px;
  `;

  const BoxTwo = styled.div`
    background-color: tomato;
    width: 100px;
    height: 100px;
  `;

  const Text = styled.span`
    color: white;
  `;

  function App() {
    return (
      <Container>
        <BoxOne>
          <Text>Hello, World</Text>
        </BoxOne>
        <BoxTwo />
      </Container>
    );
  }

  export default App;
  ```

  - 스타일 컴포넌트는 정의된 엘리먼트와 스타일을 기반으로 컴포넌트를 만들고 할당함
  - 각각의 컴포넌트가 사용되는 곳에서는 랜덤한 클래스명을 붙이고 정의된 스타일을 매치시킴
    <aside>
    💡 여기서 BoxOne, BoxTwo의 가로세로 사이즈의 코드가 중복되어 있는데, 이것을 어떻게 해결해 나갈지도 주목해봐야 함

    </aside>
