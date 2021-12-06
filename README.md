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


### Adapting and Extending

- 저번 섹션에서 BoxOne, BoxTwo의 CSS속성의 중복을 해결하기 위한 방법으로는 Adapting이 존재함
- Adapting은 Prop을 이용해서 컴포넌트에 원하는 값을 전달하고, 해당 값을 style에서 이용하는 패턴을 이용하는것을 말함
  ```jsx
  import styled from 'styled-components';

  const Container = styled.div`
    display: flex;
  `;

  const Box = styled.div`
    background-color: ${(props) => props.bgColor};
    width: 100px;
    height: 100px;
  `;

  const Text = styled.span`
    color: white;
  `;

  function App() {
    return (
      <Container>
        <Box bgColor='teal'>
          <Text>Hello, World</Text>
        </Box>
        <Box bgColor='tomato' />
      </Container>
    );
  }

  export default App;
  ```
  - 다만, 이 방법또한 문제점이 있을 수 있는데, 다음 코드를 확인해보자
    ```jsx
    import styled from 'styled-components';

    const Container = styled.div`
      display: flex;
    `;

    const Box = styled.div`
      background-color: ${(props) => props.bgColor};
      width: 100px;
      height: 100px;
    `;

    const Circle = styled.div`
      background-color: ${(props) => props.bgColor};
      width: 100px;
      height: 100px;
      border-radius: 50px;
    `;

    const Text = styled.span`
      color: white;
    `;

    function App() {
      return (
        <Container>
          <Box bgColor='teal'>
            <Text>Hello, World</Text>
          </Box>
          <Circle bgColor='tomato' />
        </Container>
      );
    }

    export default App;
    ```
    - 이 코드에서는 새로운 Circle을 만들면서 border-radius를 추가하고 있어서, 새로운 컴포넌트에 스타일이 대부분 중복되어 있다는 점이 문제가 됨
    - 원인으로는 컴포넌트명이 변경되면 새롭게 스타일 코드를 작성해야 하기 때문인데, 이를 styled의 함수를 이용해서 해결 가능함 (Extending)
      ```jsx
      import styled from 'styled-components';

      const Container = styled.div`
        display: flex;
      `;

      const Box = styled.div`
        background-color: ${(props) => props.bgColor};
        width: 100px;
        height: 100px;
      `;

      const Circle = styled(Box)`
        border-radius: 50px;
      `;

      const Text = styled.span`
        color: white;
      `;

      function App() {
        return (
          <Container>
            <Box bgColor='teal'>
              <Text>Hello, World</Text>
            </Box>
            <Circle bgColor='tomato' />
          </Container>
        );
      }

      export default App;
      ```
      - Circle은 Box를 확장해서 border-radius만 추가하고 있음
      - bgColor라는 Prop 데이터를 전달해도, 확장전 부모인 Box에서 이용가능했기 때문에, Circle에서도 이용 가능함

### 'As' and Attrs

- 다수의 컴포넌트를 다룰 때 도움이 될 만한 트릭 중 하나

1. As
   - 스타일 컴포넌트의 스타일 정의는 그대로 유지하면서 태그만 변경하고 싶을 경우 활용
   - As를 이용하면, 스타일은 유지하면서 태그만 변경할수 있음
     ```jsx
     import styled from 'styled-components';

     const Container = styled.div`
       display: flex;
     `;

     const Btn = styled.button`
       color: white;
       background-color: tomato;
       border: 0;
       border-radius: 15px;
     `;

     const Link = styled(Btn)``;

     function App() {
       return (
         <Container as='header'>
           <Btn>Login</Btn>
           <Btn as='a' href='/'>
             Login
           </Btn>
         </Container>
       );
     }

     export default App;
     ```
2. attrs
   - 스타일 컴포넌트에서 HTML속성값을 일률적으로 추가해줄때 활용
     ```jsx
     import styled from 'styled-components';

     const Container = styled.div`
       display: flex;
     `;

     const Input = styled.input.attrs({ required: true, minLength: 10 })`
       background-color: tomato;
     `;

     function App() {
       return (
         <Container>
           <Input />
           <Input />
           <Input />
           <Input />
           <Input />
         </Container>
       );
     }

     export default App;
     ```
     - Input태그를 작성하면서 required와 minLength를 일괄적으로 설정해줄 수 있음

### Animations

- 스타일 컴포넌트에서의 애니메이션 활용법은 클래스 안에 있는 keyframes를 그대로 활용하여 정의해주면 됨
  ```jsx
  import styled, { keyframes } from 'styled-components';

  const Container = styled.div`
    display: flex;
  `;

  const animation = keyframes`
    0% {
      transform: rotate(0deg);
      border-radius: 0px;
    }
    50% {
      border-radius: 100px;
    }
    100% {
      transform: rotate(360deg);
      border-radius: 0px;
    }
  `;

  const Box = styled.div`
    height: 200px;
    width: 200px;
    background-color: tomato;
    animation: ${animation} 3s linear infinite;
  `;

  function App() {
    return (
      <Container>
        <Box />
      </Container>
    );
  }

  export default App;
  ```

### Psudo Selectors

- 스타일 컴포넌트를 활용할때 모든 엘리먼트를 컴포넌트화 해야만 스타일을 정의할 수 있는것은 아님
- 컴포넌트의 자식 엘리먼트가 컴포넌트가 아닐 경우, 부모 컴포넌트의 스타일 컴포넌트 정의에서 CSS 셀렉터를 이용해서 자식 엘리먼트를 타겟으로 지정하여 스타일을 정의할 수 있음
  ```jsx
  const Box = styled.div`
    height: 200px;
    width: 200px;
    background-color: tomato;
    animation: ${animation} 3s linear infinite;
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      font-size: 32px;
    }
  `;

  function App() {
    return (
      <Container>
        <Box>
          <span>😘</span>
        </Box>
      </Container>
    );
  }
  ```
  - 상기 코드에서 Box 컴포넌트의 자식 엘리먼트인 span을 Box 컴포넌트의 스타일 컴포넌트에서 바로 셀렉터로 지정해서 폰트사이즈를 변경하는것을 알 수 있음
    <aside>
    💡 다만, 직접 span같이 태그를 지정하게 되면 다른 태그로 변경되었을때를 대응하지 못하는데, 이럴때 활용할수 있는것은 자식 엘리먼트 또한 컴포넌트화 시켜서 자식 컴포넌트를 셀렉터로 지정하면 됨
    
    </aside>
    
    ```jsx
    const Emoji = styled.span`
      font-size: 32px;
      &:hover {
        font-size: 98px;
      }
    `;
    
    const Box = styled.div`
      height: 200px;
      width: 200px;
      background-color: tomato;
      animation: ${animation} 3s linear infinite;
      display: flex;
      justify-content: center;
      align-items: center;
    
      ${Emoji} {
        font-size: 32px;
        &:hover {
          font-size: 48px;
        }
        &:active {
          opacity: 0;
        }
      }
    `;
    
    function App() {
      return (
        <Container>
          <Box>
            <Emoji>😘</Emoji>
          </Box>
        </Container>
      );
    }
    ```
    
    - 상기 코드에서 흥미로운 부분은 CSS 셀렉터를 이용할때 HTML태그가 아닌, 컴포넌트 변수를 이용해도 된다는 점

### Themes

- 스타일 컴포넌트에서 테마는 다크모드를 구현할 수 있게 해줌
- 추가로 Local Estate Management라는 기능이 있는데 이는 추후 별도 섹션에서 배우자
- Theme은 색상코드를 모아놓은 오브젝트
  - 추후에 색상배합을 변경할때 해당 오브젝트만 수정하면 됨
  - 사용방법
    ```jsx
    import React from 'react';
    import ReactDOM from 'react-dom';
    import { ThemeProvider } from 'styled-components';
    import App from './App';

    const darkTheme = {
      textColor: 'whitesmoke',
      backgroundColor: '#111',
    };

    const lightTheme = {
      textColor: '#111',
      backgroundColor: 'whitesmoke',
    };

    ReactDOM.render(
      <React.StrictMode>
        <ThemeProvider theme={darkTheme}>
          <App />
        </ThemeProvider>
      </React.StrictMode>,
      document.getElementById('root'),
    );
    ```
    - 먼저 index.js에서 정의한 App 컴포넌트를 ThemeProvider로 감싸주기
    - ThemeProvider는 Prop으로 theme을 받는데, 해당 Prop에 색상 Props를 정의해주기
    ```jsx
    import styled from 'styled-components';

    const Container = styled.div`
      width: 100vw;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: ${(props) => props.theme.backgroundColor};
    `;

    const Title = styled.h1`
      color: ${(props) => props.theme.textColor};
    `;

    function App() {
      return (
        <Container>
          <Title>Hello, World!</Title>
        </Container>
      );
    }

    export default App;
    ```
    - App.js에서 props를 통해 theme에 접근하고, theme 오브젝트의 색상코드를 그대로 활용 가능
