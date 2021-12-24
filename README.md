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

## TypeScript

### Introduction

- 타입스크립트는 자바스크립트를 기반으로 한 프로그래밍 언어
- 기반으로 했기 때문에 문법등이 전혀 다른것은 아니며, 거의 비슷하고 몇몇 부분만 추가되었을 뿐임
- 타입스크립트는 strongly-typed한 언어이며 strongly-typed? 프로그래밍 언어가 동작하기 전에 타입을 확인함 (컴파일)

```jsx
// JavaScript 방식
const plus = (a, b) => a + b;
plus(2, 2); // 4
plus(2, 'hi'); // '2hi'

// 개발자의 의도가 숫자를 더하는 함수를 만들고 싶었다고 하더라도,
// JavaScript는 타입체크를 하지 않기 때문에 두번째 결과가 발생할 수 있음
```

<aside>
💡 개발자의 의도를 코드에 명시해서, JavaScript가 의도에 맞지 않는 매개변수를 입력받았을 경우에는 알림을 주었으면 좋겠다는 의도에서 탄생한 TypeScript

</aside>

```jsx
// 두번째 예제
const user = {
  firstName: 'Angela',
  lastName: 'Davis',
  role: 'Professor',
};
console.log(user.name); // undefined

// name이 존재하지 않기 때문에 JavaScript는 undefined를 출력하지만,
// 개발자에게는 정의되지 않은 오브젝트 내의 속성을 호출할경우 에러를 출력해주는것이 도움이 됨
```

<aside>
💡 의도와 다른 방향(실수)으로 코드를 작성했을때 해당 부분을 알려주는 특성이 있는 언어가 개발자 친화적이라고 할 수 있음

</aside>

- 런타임에서 에러가 발견되는것은 때에 따라서 치명적일 수 있음
- 타입스크립트는 그러한 에러를 프로그램이 가동되기 전에 미리 알려주는 기능을 탑재하고 있음
- TypeScript Playground
  [TS Playground - An online editor for exploring TypeScript and JavaScript](https://www.typescriptlang.org/play)
  ```jsx
  // TypeScript 방식
  const plus = (a: number, b: number) => a + b;
  plus(2, 2); // 4
  plus(2, 'hi'); // error
  ```
    <aside>
    💡 매개변수에 타입을 미리 정의함으로써 코드상에서의 잘못을 지적할 수 있음
    
    </aside>


### DefinitelyTyped

- CRA에 TypeScript를 추가하는 방법으로는 앱을 생성하는 시점에서 타입스크립트의 형태로 만들기
- 기존 앱상에서 타입스크립트를 수동으로 설치해서 변환하는 방법

[Adding TypeScript | Create React App](https://create-react-app.dev/docs/adding-typescript/)

```bash
# CRA로 앱 만들때 템플릿을 타입스크립트의 형태로 만들기
npx create-react-app my-app --template typescript

# 기존 프로젝트에 타입스크립트 패키지 설치하기
npm install --save typescript @types/node @types/react @types/react-dom @types/jest
```

- 기존 프로젝트를 변경할 경우 타입스크립트를 인스톨한 뒤에 파일명 변경
  - App.js → App.tsx
  - index.js → index.tsx
- 변경 후에 JavaScript 라이브러리등에서 에러가 발생할 수 있음
  - 예를 들어, styled-components 등에서 에러가 발생하면 해결방법으로는 타입스크립트에 정의문을 추가해줄 필요가 있음
    [@types/styled-components](https://www.npmjs.com/package/@types/styled-components)
    ```bash
    npm install -D @types/styled-components
    ```
  - 스타일 컴포넌트와 같이 JavaScript 전용 라이브러리의 경우에는 오픈소스 형태로 개발자들이 소스를 분석해서 타입스크립트의 정의문을 제공하는데, 이것이 @types 라이브러리에 있는 styled-components임
- 개발자들이 모여서 만든 타입정의 커뮤니티를 DefinitelyTyped 라고 부르고 npm의 @types를 찾아보자

### Typing the Props

- 컴포넌트에 타입을 지정하는 방법
- JavaScript에서 PropTypes를 통해 React의 Props들의 타입을 확인하는 기능을 추가할 수 있지만, PropTypes는 JavaScript 라이브러리이므로, 런타임에서 확인후 브라우저 콘솔에 출력하는 정도에 그쳤음
- TypeScript를 사용하면, 코드를 작성하는 시점에서 확인후 에러를 표시하므로, 오류가 있는 코드를 릴리즈 하지 않도록 도와줌
- Interface
  - 인터페이스란 객체의 생김새를 TypeScript에서 설명해주는 개념
  - 컴포넌트의 Props를 사용할때 Props Object를 이용하게 되는데, 그때 Prop들마다 타입을 지정해줄수도 있지만, interface를 이용해서 객체 형태를 먼저 정의해주고 해당 interface를 사용할 수 있음
    ```jsx
    interface ContainerProps {
      bgColor: string;
    }

    const Container =
      styled.div <
      ContainerProps >
      `
      width: 200px;
      height: 200px;
      background-color: ${(props) => props.bgColor};
      border-radius: 100px;
    `;

    interface CircleProps {
      bgColor: string;
    }

    const Circle = ({ bgColor }: CircleProps) => {
      return <Container bgColor={bgColor} />;
    };
    ```
      <aside>
      💡 스타일 컴포넌트에서 props를 정의할때 <Props>형태로 사용하는데, 이때 Interface를 이용해서 깔끔하게 코딩 가능
      
      </aside>


### Optional Props

- Typing the Props 섹션에서 작성한 샘플코드의 경우에 Interface를 이용하여 Props를 명시했는데, 이렇게 되면 기본적으로 required 상태가 됨
- Props를 선택적으로 사용하고 싶을 경우에는 어떻게 하면 될까?
- TypeScript에서는 선언형 매개변수, 변수의 선택자에 ?를 붙여서 정의하면 됨

```jsx
interface ContainerProps {
  bgColor: string;
  borderColor: string;
}

const Container =
  styled.div <
  ContainerProps >
  `
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
  border-radius: 100px;
  border: 1px solid ${(props) => props.borderColor};
`;

interface CircleProps {
  bgColor: string;
  borderColor?: string;
}

const Circle = ({ bgColor, borderColor }: CircleProps) => {
  return <Container bgColor={bgColor} borderColor={borderColor ?? bgColor} />;
};
```

- borderColor를 선택적으로 사용하고 싶을 경우 borderColor?: string으로 정의
- JavaScript에서 A ?? B 연산자는 A가 null 또는 undefined일 경우에 B가 실행되는 연산자
  [](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator)
- 상기 코드의 해석으로는 Container의 Props중 bgColor는 필수이며, borderColor는 선택적이며, 값이 Props Data로 입력될 경우에는 해당 값을 취하지만, 그렇지 않을 경우에는 bgColor와 동일한 색상으로 border를 작성하게 됨

### State

- React의 함수형 hook에 의해서 사용할수 있는 State로는 useState()가 있음
- TypeScript와 함께 사용할 때 useState의 경우 기본값을 주게되면 기본값의 논리형에 근거해서 TypeScript가 추론한 논리형이 변수에 부여되고, setter또한 자동으로 형태가 지정됨
  - 이는 합리적인 추론으로, state를 작성하는 시점에 부여되는 형태가 변경되는 경우는 대부분 없음
  - 하지만 복수형태의 변수또한 존재할 수는 있는데, 이를 작성시점에 부여할 수 있음
    ```jsx
    const [value, setValue] = (useState < number) | (string > 1);
    setValue('hello'); // OK
    setValue(2); // OK
    setValue(true); // NOT OK
    ```

### Form

- 폼을 이용하는 기본 소스코드를 일단 첨부

```jsx
import { useState } from 'react';

const App = () => {
  const [value, setValue] = useState('');
  const onChange = (event) => {};
  return (
    <div>
      <form>
        <input type='text' placeholder='username' value={value} onChange={onChange} />
        <button>Login</button>
      </form>
    </div>
  );
};

export default App;
```

- TypeScript에서는 onChange() 함수의 event를 매개변수로 하는 부분에서 에러가 발생함
  - JavaScript에서 event는 any타입으로 설정되어 있기 때문
  - TypeScript를 위해서 event에서 어떤 타입을 지정해야 할까?
    <aside>
    💡 React.FormEvent를 event에 지정해주면, 에러가 해결됨
    
    </aside>

- React Forms and Events에서 TypeScript를 사용시 참고
  [Forms and Events | React TypeScript Cheatsheets](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/)
- **☕️ SyntheticEvent**에 대해서
  ```jsx
  const onClick = (event: React.FormEvent<HTMLButtonElement>) => {};
  ```
  [SyntheticEvent - React](https://reactjs.org/docs/events.html)
  - 위와 같이 React 기반으로 폼이벤트를 지정해서 해당 폼 안에 있는 엘리먼트를 직접 지정하거나, 마우스 이벤트등과 같이 별도의 React만의 이벤트 정의를 이용하게 되는데, 타입스크립트는 이벤트의 타입을 React 전용 타입으로 지정할 뿐임
  - 따라서 이러한 방식은 React에 의존한 코딩방식이 되며, 다른 라이브러리(예를 들어 Vue나 Angular)에서는 다른 이벤트 정의 방식을 사용할 수 있음
- 이처럼 React와 TypeScript를 동시에 사용하면서, 서로 보완하는 문법은 배워야 하지만 크게 바뀌지 않고 여러번 사용하다보면 패턴처럼 몸에 익을수 있음
- 간단한 유저이름을 입력받고, 로그인 버튼을 누르면 콘솔에 출력되는 어플리케이션
  ```jsx
  import React, { useState } from 'react';

  const App = () => {
    const [value, setValue] = useState('');
    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
      setValue(event.currentTarget.value);
    };
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log(`hello ${value}`);
    };
    return (
      <div>
        <form onSubmit={onSubmit}>
          <input type='text' placeholder='username' value={value} onChange={onChange} />
          <button>Login</button>
        </form>
      </div>
    );
  };

  export default App;
  ```
    <aside>
    💡 TypeScript를 이용한 React.FormEvent의 활용으로 런타임이 아닌 컴파일타임에 에러를 발견할 수 있음
    
    </aside>


### Themes

- 스타일 컴포넌트 섹션에서 공부했던 테마 적용의 경우 TypeScript와 연계하기에 적합한데, index파트에 테마를 적용하고 앱 컴포넌트를 ThemeProvider로 감싸주어, App 컴포넌트 이하 자식 컴포넌트들에서 해당 테마 오브젝트에 접근하는 형태였음
- 이러한 형태를 사용하기 때문에, 테마에 정의되지 않은 Prop에 접근한다거나 코딩시에 철자를 실수한다거나 하는 문제로 런타임시에 의도하지 않게 버그나 작동불가 상황이 발생하게 되는데, TypeScript와 vscode를 연계하여 이러한 문제해결을 시도해볼 수 있음
- TypeScript에서는 타입을 위한 정의문서가 존재하는데, [filename].d.ts 가 그것임
- styled-components의 경우 @types/styled-components 패키지에 해당 파일이 정의되어 있는데, 이를 extending하여 프로젝트 고유의 몇가지 정의문서를 추가할 수 있음
  - 정의문서 베이직 참고 사이트
    [styled-components: API Reference](https://styled-components.com/docs/api#typescript)
  - 샘플코드
    - index.tsx
      ```tsx
      import React from 'react';
      import ReactDOM from 'react-dom';
      import { ThemeProvider } from 'styled-components';
      import App from './App';
      import { darkTheme, lightTheme } from './theme';

      ReactDOM.render(
        <React.StrictMode>
          <ThemeProvider theme={darkTheme}>
            <App />
          </ThemeProvider>
        </React.StrictMode>,
        document.getElementById('root'),
      );
      ```
    - App.tsx
      ```tsx
      import styled from 'styled-components';

      const Container = styled.div`
        background-color: ${(props) => props.theme.bgColor};
      `;

      const H1 = styled.h1`
        color: ${(props) => props.theme.textColor};
      `;

      const App = () => {
        return (
          <Container>
            <H1>World, World!</H1>
          </Container>
        );
      };

      export default App;
      ```
    - styled.d.ts
      ```tsx
      // import package to extend
      import 'styled-components';

      // extending
      declare module 'styled-components' {
        export interface DefaultTheme {
          textColor: string;
          bgColor: string;
          btnColor: string;
        }
      }
      ```
    - theme.ts
      ```tsx
      import { DefaultTheme } from 'styled-components';

      export const lightTheme: DefaultTheme = {
        bgColor: 'white',
        textColor: 'black',
        btnColor: 'tomato',
      };

      export const darkTheme: DefaultTheme = {
        bgColor: 'black',
        textColor: 'white',
        btnColor: 'teal',
      };
      ```

### TypeScript 복습

- 만약 특정 라이브러리를 다운받았는데, 타입스크립트 지원이 되지 않는 경우
  - [filename].d.ts가 없는 경우
  1. DefinitlyTyped에서 먼저 찾아보기 만약 있다면 설치

     ```bash
     npm install -D @types/{packageName}

     # GitHub에서 패키지를 검색하려 들지 말고,
     # 바로 npm을 이용해서 패키지명을 넣어보고, 인스톨 되는지 확인하는게 빠름
     ```

## Crypto Tracker

- CoinPaprika의 API를 이용해서 데이터를 추출해오고 표시해주는 어플리케이션
- fetch를 이용해서 데이터를 가져오는 방법 → React Query를 이용해서 데이터를 가져오는 방법

### Setup

- [https://api.coinpaprika.com/v1/coins](https://api.coinpaprika.com/v1/coins)

```bash
# 기본 패키지 인스톨
npm install styled-components react-router-dom react-query
npm install -D @types/styled-components
```

```bash
# Structure
/                        # All coins
/:coinId                 # Coin details
/:coinId/information     # Coin information
/:coinId/chart           # Coin chart
```

### CSS Setup

- 브라우저는 기본 스타일링을 가지고 있기 때문에, 원하는 스타일링을 적용하기 위해 한번 리셋하는 과정을 거치는것이 좋음
- 리셋 스타일을 적용하는 방법
  1. styled-reset 패키지 설치 후 적용

     ```bash
     # npm i styled-reset (use the -S flag if you're on npm 4 or earlier).
     # If you're on styled-components 3.x, please npm i styled-reset@1.7.1.
     npm install styled-reset
     ```

     ```jsx
     // Styled Components 4.x || 5.x
     import * as React from 'react';
     import { Reset } from 'styled-reset';

     const App = () => (
       <React.Fragment>
         <Reset />
         <div>Hi, I'm an app!</div>
       </React.Fragment>
     );
     ```

  2. 스타일링을 styled-components를 이용한 global style 객체를 생성해서 적용

     ```jsx
     // You can also use the default export
     // or named export (lowercase) in your own global style
     import * as React from 'react'
     import { createGlobalStyle } from 'styled-components'
     import reset from 'styled-reset'

     const GlobalStyle = createGlobalStyle`
       ${reset}
       /* other styles */
     	* {
     		box-sizing: border-box;
     	}
     	body {
     		font-family: 'Source Sans Pro', sans-serif;
     	}
     	a {
     		text-decoration: none;
     	}
     `

     const App = () => (
       <>
         <GlobalStyle />
         <div>Hi, I'm an app!</div>
       </>
     }

     export default App
     ```

     ```css
     /*
      * Reset CSS
      */

     html,
     body,
     div,
     span,
     applet,
     object,
     iframe,
     h1,
     h2,
     h3,
     h4,
     h5,
     h6,
     p,
     blockquote,
     pre,
     a,
     abbr,
     acronym,
     address,
     big,
     cite,
     code,
     del,
     dfn,
     em,
     img,
     ins,
     kbd,
     q,
     s,
     samp,
     small,
     strike,
     strong,
     sub,
     sup,
     tt,
     var,
     b,
     u,
     i,
     center,
     dl,
     dt,
     dd,
     menu,
     ol,
     ul,
     li,
     fieldset,
     form,
     label,
     legend,
     table,
     caption,
     tbody,
     tfoot,
     thead,
     tr,
     th,
     td,
     article,
     aside,
     canvas,
     details,
     embed,
     figure,
     figcaption,
     footer,
     header,
     hgroup,
     main,
     menu,
     nav,
     output,
     ruby,
     section,
     summary,
     time,
     mark,
     audio,
     video {
       margin: 0;
       padding: 0;
       border: 0;
       font-size: 100%;
       font: inherit;
       vertical-align: baseline;
     }
     /* HTML5 display-role reset for older browsers */
     article,
     aside,
     details,
     figcaption,
     figure,
     footer,
     header,
     hgroup,
     main,
     menu,
     nav,
     section {
       display: block;
     }
     /* HTML5 hidden-attribute fix for newer browsers */
     *[hidden] {
       display: none;
     }
     body {
       line-height: 1;
     }
     menu,
     ol,
     ul {
       list-style: none;
     }
     blockquote,
     q {
       quotes: none;
     }
     blockquote:before,
     blockquote:after,
     q:before,
     q:after {
       content: '';
       content: none;
     }
     table {
       border-collapse: collapse;
       border-spacing: 0;
     }
     ```
- 폰트를 적용할때는 구글 폰트사이트를 이용함
  [Google Fonts](https://fonts.google.com/)
  - Source Sans Pro를 이용하여 Light 300, Regular 400을 불러온 뒤에 다음을 적용
    ```css
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&family=Source+Sans+Pro:wght@300;400&display=swap');
    ${reset}
    * {
    	box-sizing: border-box;
    }
    body {
    	font-family: 'Source Sans Pro', sans-serif;
    }
    a {
    	text-decoration: none;
    }
    ```
- 배경색상등을 선택할때는 flat UI Colors를 이용
  [Flat UI Colors 2 - 14 Color Palettes, 280 colors 🎨](https://flatuicolors.com/)

### Home (/)

- 코인파프리카 API를 이용해서 데이터를 수집
  ```tsx
  useEffect(() => {
    const fetchCoins = async () => {
      const response = await fetch('https://api.coinpaprika.com/v1/coins');
      const json = await response.json();
      setCoins(json.slice(0, 50));
      setLoading(false);
    };
    fetchCoins();
  }, []);
  ```
    <aside>
    💡 useEffect()는 deps에 지정된 state가 변경되는 타이밍에 실행되는 hook형 메소드인데 deps를 []로 아무런 state도 지정하지 않게 되면 컴포넌트가 로딩되는 최초 타이밍에 1회 실행됨
    
    </aside>

- Coin 인터페이스를 작성해서 State를 정의
  ```tsx
  interface CoinsInterface {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
  }

  const [coins, setCoins] = useState<CoinsInterface[]>([]);
  ```
    <aside>
    💡 인터페이스와 제네릭을 이용해서 State선언시 미리 변수타입을 지정하는 코딩방식을 채용
    
    </aside>

- Home을 만들고 나서의 동작확인에서 코인 상세화면에 이동후 다시 홈으로 돌아올 경우, coins State가 초기화 되기 때문에 API를 재호출하게 되는데, 이를 해결하는 방법을 다음 섹션에서 해설
- 추가내용
  - 코인아이콘 API
    [](https://cryptoicon-api.vercel.app/api/icon/btc)

### Route States

- 메인 화면에서 특정 코인을 클릭하면 코인에 대한 상세화면으로 이동
- 상세화면으로 이동할때 전 화면에서 가지고 있는 정보를 백엔드에 다시 호출하는것은 바람직하지 못한 방식
- 화면 이동시에 어떻게 데이터를 전송할까?
  - React Route Dom을 이용하면 Link에서 state prop을 이용하면 데이터를 포함해서 화면을 이동시킬 수 있음
  - 다만 이동하는 화면을 직접 호출하면, 전 화면에서 받아야 하는 데이터가 존재하지 않아서 에러가 발생할 수 있음
  ```tsx

  ```

### useEffect

- useEffect()는 React에서 컴포넌트의 라이프타임 중 어떤 시점에 코드를 실행할지 결정하는 함수인데, dependency를 어떻게 설정하느냐에 따라서 해당 코드의 실행 시점이 결정됨
- 개념적인 의미로는 deps는 array형태의 state 변수로 이루어져 있으며, 의미로는 해당 state들이 변경되는 타이밍에 코드를 실행한다는 점임
- deps를 공란으로 두면 어떤 state도 watch하지 않지만, 최초 컴포넌트가 실행되는 타이밍에는 모든 useEffect가 실행되므로, 한번 실행되는것은 보장함
- useEffect에 대한 자세한 설명은 다음 블로그에서 설명하고 있으니 나중에 참고
  [[React] useEffect의 동작 원리](https://jungpaeng.tistory.com/92)

### Nested Routes

- Nested Routes는 Route안에 있는 또 다른 Route를 의미
- Nested Router는 다음의 경우 유용하게 사용 가능
  - 같은 스크린 안에 다양한 섹션이 나누어져 있는 경우
  - 탭으로 여러 분기점을 만드는 경우
- 이것을 구현하기 위해서 State를 이용하거나, Nested Router를 이용할 수 있음
- Crypto Tracker에서 구현해볼 것들
  - 코인 상세화면에서 2가지 탭을 구현 (Chart, Price)
  - 각각의 분기는 URL을 이용한 Nested Router를 컴포넌트에서 구현하는 것으로 달성
    ```bash
    localhost:3000/btc-bitcoin/chart
    localhost:3000/btc-bitcoin/price
    # 위의 두 URL은 같은 화면이지만, 다른 탭을 표시하도록 구현
    ```
- URL을 이용해서 분기점을 구현하면, 유저들이 직접 접근할수 있기 때문에 유용함
- 구현 순서
  1. routes 디렉토리에 Chart.tsx Price.tsx로 각각의 라우터에서 구현할 화면 컴포넌트를 작성
  2. react-route-dom에서 Routes와 Route를 import한 뒤, 화면에서 Routes를 이용해서 분기점을 작성하여 각각의 Route에서 화면(Chart, Price)을 불러옴
     - 이 과정에서 react-route-dom의 document를 확인해볼것
     - 힌트: path, element 등
       - path는 특정 URL path에서 실행할 컴포넌트를 지정 가능
       - 부모 라우터의 경로에 /\* 를 지정해줘야 해당 컴포넌트 안에서 자식 컴포넌트가 라우터를 렌더링 할 수 있음
       ```tsx
       function App() {
         return (
           <Routes>
             <Route path='/' element={<Home />} />
             <Route path='dashboard/*' element={<Dashboard />} />
           </Routes>
         );
       }

       function Dashboard() {
         return (
           <div>
             <p>Look, more routes!</p>
             <Routes>
               <Route path='/' element={<DashboardGraphs />} />
               <Route path='invoices' element={<InvoiceList />} />
             </Routes>
           </div>
         );
       }
       ```
  3. 탭 만들기 (CSS 포함)
     - Link 컴포넌트를 이용해서 탭을 만들기
     - anchor와의 차이점은 anchor는 페이지 자체를 새로고침 하지만, Link의 경우에는 필요한 컴포넌트만 새로 렌더링 한다는 점
     - 탭에서 현재 URL정보를 보면서 스타일링을 적용해야 할 경우
       - useMatch()를 이용해서 현재 URL정보를 가져오기
       - useMatch('/:coinId/price')를 이용하면 현재 URL의 정보가 price인지 확인가능
       - usematch는 매치하면 match 객체를, 매치 하지 않으면 null을 반환함
     - 탭에 isActive라는 프로퍼티를 추가하고 URL검사결과를 이용
       ```tsx
       // 스타일 컴포넌트의 props 추가 방법
       const Tab = styled.div<{ isActive: boolean }>`
         width: 200px;
         padding: 10px;
         border-radius: 10px;
         background-color: rgba(0, 0, 0, 0.7);
         color: ${({ isActive, theme: { accentColor, textColor } }) =>
           isActive ? accentColor : textColor};
         display: flex;
         justify-content: center;
       `;
       ```

### React Query

- 먼저 React Query 패키지를 인스톨하자
  ```bash
  npm install react-query
  ```
- 기본적인 React Query 사용방법
  - 쿼리 클라이언트를 이용해서 어플리케이션을 감싸주면 됨
  ```tsx
  import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

  const queryClient = new QueryClient();

  export default function App() {
    return (
      <QueryClientProvider client={queryClient}>
        <Example />
      </QueryClientProvider>
    );
  }
  ```
- React 쿼리의 역할
  - 특정 API에서 데이터를 가져와서 State 변수에 설정해줌
    - Data State 자동관리
    - isLoading State 제공
  - fetcher() 함수를 작성할 수 있게 해줌
    ```tsx
    const response = awiat fetch('api address');
    const json = await response.json();
    // 상기 코드를 fetch 과정이라고 하면 fetcher 함수는 이런것들을 함축하고 있음
    ```
  - 한번 요청한 데이터는 캐싱하여 재사용 할 수 있게 해줌
- React 쿼리 만드는 방법
  1. api.ts파일 작성
     - 이 파일에는 fetch 함수들이 나열됨
  2. useQuery()를 이용해서 기존 코드의 refactoring을 달성

### Price Chart

- CoinPaprika API를 이용해서 차트에 필요한 데이터 받아오기
  [https://api.coinpaprika.com/#tag/Coins/paths/~1coins~1%7Bcoin_id%7D~1ohlcv~1historical/get](https://api.coinpaprika.com/#tag/Coins/paths/~1coins~1%7Bcoin_id%7D~1ohlcv~1historical/get)
  - 특정 코인의 날짜별 기록을 받아올수 있는 API가 있음
  - React Query를 이용해서 2주전 코인 가격부터 시작해서 조회일자까지를 받아오는 fetcher함수를 제작
- 데이터 시각화 라이브러리 (APEXCHART.js)
  [ApexCharts.js - Open Source JavaScript Charts for your website](https://apexcharts.com/)
  - APEXCHART 설치 순서
    1. Docs → Intergration → React Chart

       ```bash
       npm install --save react-apexcharts apexcharts
       ```

    2. React apexchart 패키지를 import 한 뒤에 도큐먼트의 컨픽을 확인하면서 옵션 추가

       ```tsx
       import ApexChart from 'react-apexcharts';

       <ApexChart
         type='candlestick'
         series={[
           {
             data: historicals?.map((historicalData) => {
               return [
                 new Date(historicalData.time_close).getTime(),
                 [
                   historicalData.open,
                   historicalData.high.toFixed(3),
                   historicalData.low.toFixed(3),
                   historicalData.close.toFixed(3),
                 ],
               ];
             }),
           },
         ]}
         options={{
           chart: {
             width: 500,
             height: 500,
             toolbar: { show: false },
             zoom: { enabled: false },
             background: 'transparent',
           },
           theme: {
             mode: currentTheme.themeName,
           },
           grid: {
             show: false,
           },
           yaxis: {
             labels: {
               show: false,
             },
           },
           xaxis: {
             labels: {
               formatter: function (value) {
                 return new Date(value).toUTCString().slice(5, 11);
               },
             },
           },
         }}
       />;
       ```

## State Management

- Recoil을 이용한 상태관리 방식에 대해서
  - Recoil은 미니멀하고 다루기 쉬운 라이브러리
- React에서 상태관리가 왜 필요할까?
  - 글로벌하게 이용되는 State를 만들려면 App 컴포넌트 (루트 컴포넌트)에 State를 만들고, 해당 State를 State가 필요한 컴포넌트까지 Props를 이용해서 State를 전달해야 함
  - 이렇게 상태를 각각의 컴포넌트에서 공유할때 해당 State 관리가 힘들어진다는 불편함이 생김
  - 글로벌 State를 특정 장소에 보관하는 기능이 생긴다면? 그리고 해당 장소에 모든 컴포넌트가 접근할 수 있다면?
  - 이런 생각에서 등장한것이 상태관리 라이브러리임

### Recoil

- 리코일은 React에서 발생하는 이러한 상태전달 문제를 해결하기 위해 등장한 라이브러리이며, 리코일에서 사용하는 상태저장소를 Atom이라고 부름
- 각각의 atom에는 각기 다른 값을 저장할 수 있음
- 만들어진 atom은 각각의 컴포넌트와 연결하고 바로 사용 가능함
- 이러한 개념을 통해, 글로벌 State의 관리가 가능해짐
- Recoil의 설치 및 이용 방법
  1. npm으로 recoil을 설치

     ```bash
     npm install recoil
     ```

  2. App을 RecoilRoot로 감싸줌

     ```tsx
     <RecoilRoot>
       <App />
     </RecoilRoot>
     ```

  3. atoms.ts 작성

     ```tsx
     import { atom } from 'recoil';

     export const themeNameAtom = atom({
       key: 'themeName',
       default: 'light',
     });
     ```

  4. useRecoilValue()를 통해서 값을 받아서 사용

     ```tsx
     const themeName = useRecoilValue(themeNameAtom);
     ```

  5. useSetRecoilState()를 통해서 값을 설정

     - useStateRecoilState()는 해당 atom의 setter function을 리턴

     ```tsx
     const setThemeName = useSetRecoilState(themeNameAtom);
     const toggleTheme = () =>
       setThemeName((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));

     <PaletteBtn onClick={toggleTheme}>
       <FontAwesomeIcon icon={faPalette} />
     </PaletteBtn>;
     ```
- Atom 또한 State의 일부이며, Atom을 사용한다는 것은 해당 State를 구독한다는 뜻이기 때문에, Atom에 어떤 값의 변화가 있을 경우에는 컴포넌트가 다시 렌더링 된다는 것을 의미함
  - 좋은점은 자동으로 변경된 값을 반영할수 있음—
- redux, recoil 내용 정리
  [redux, recoil 내용 정리](https://velog.io/@katanazero86/redux-recoil-%EB%82%B4%EC%9A%A9-%EC%A0%95%EB%A6%AC)
- 정리
  - 상태관리 라이브러리는 Traveling Props 문제를 해결함
  - 상태관리 라이브러리 중 Recoil을 사용, Recoil은 Atom이라는 글로벌 State를 이용해서 상태를 관리함
  - Recoil의 사용법
    - useRecoilValue()
    - useSetRecoilState()

### Form

- React에서 특정 폼을 만들고 해당 폼 안에 인풋을 만들려면 기본적으로 다음과 같은 코딩이 필요함
  ```tsx
  import { useState } from 'react';

  const ToDoList = () => {
    const [toDo, setToDo] = useState('');
    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
      setToDo(event.currentTarget.value);
    };
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log(toDo);
    };

    return (
      <div>
        <form onSubmit={onSubmit}>
          <input type='text' placeholder='Type your to do' value={toDo} onChange={onChange} />
          <input type='submit' value='Add ToDo' />
        </form>
      </div>
    );
  };

  export default ToDoList;
  ```
- 하나의 인풋에 onChange 훅이 필요하기 때문에, 인풋을 추가할때마다 함수를 추가로 배정해서 관리해야 함
- 또한 인풋에 들어가는 값을 일일히 State화 하여 관리해야 함 (덤으로 검증작업에 대한 로직도 별도 작성)
- 이를 편하게 관리할 수 있도록 도와주는 다양한 라이브러리가 존재
  - React Hook Form
- React Hook Form을 설치하고 사용하기
  1. 설치

     ```bash
     npm install react-hook-form
     ```

  2. useForm() 훅을 이용한 인풋 관리

     ```tsx
     const { register, watch } = useForm();
     <form>
       <input {...register('ToDo')} type='text' placeholder='Type your to do' />
       <input type='submit' value='Add ToDo' />
     </form>;
     ```
- React Hook Form에서 인풋별로 옵션 추가하기
  1. 항목의 필수화

     - 항목에 옵션으로 required를 설정하게 되면, RHF이 자동으로 항목을 체크하고 후처리를 담당해줌
     - 빈칸 자동으로 focus 처리하기

     ```tsx
     <input {...register('email', { required: true })} placeholder='Enter email' />
     ```

  2. 최소길이 설정

     minLength: 10

  3. 기타 설정값에 대해서 알아보기

     [useForm - register](https://react-hook-form.com/api/useform/register)
- React Hook Form으로 폼 검증하고, 에러 출력하기
  ```tsx
  const ToDoList = () => {
    const {
      register,
      handleSubmit,
      formState: { errors },
      setError,
    } = useForm<FormProps>({
      defaultValues: {
        email: '@naver.com',
      },
    });
    const onValid = ({ password, passwordConfirm }: FormProps) => {
      if (password !== passwordConfirm) {
        setError(
          'passwordConfirm',
          { message: 'Password are not the same!' },
          { shouldFocus: true },
        );
      }
      //setError('extraError', { message: 'Server Offline' });
    };

    return (
      <div>
        <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit(onValid)}>
          <input
            {...register('email', {
              required: 'Email is required!',
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@naver.com/,
                message: 'Only naver.com email is allowed',
              },
            })}
            placeholder='Email'
          />
          <Error>{errors?.email?.message}</Error>
          <input
            {...register('username', {
              required: 'Username is required!',
              minLength: {
                value: 8,
                message: 'Username is too short',
              },
              validate: {
                noAdmin: (value) => !value.includes('admin') || 'No admin include on username',
              },
            })}
            placeholder='Username'
          />
          <Error>{errors?.username?.message}</Error>
          <input
            {...register('password', {
              required: 'Password is required!',
              minLength: {
                value: 5,
                message: 'Password is too short',
              },
            })}
            placeholder='Password'
          />
          <Error>{errors?.password?.message}</Error>
          <input
            {...register('passwordConfirm', {
              required: 'Password Confirm is required!',
              minLength: {
                value: 5,
                message: 'Password is too short',
              },
            })}
            placeholder='Password Confirm'
          />
          <Error>{errors?.passwordConfirm?.message}</Error>
          <input type='submit' value='Add ToDo' />
          <Error>{errors?.extraError?.message}</Error>
        </form>
      </div>
    );
  };
  ```

### ToDo 어플리케이션

- Recoil State를 이용해서 작성하는 ToDo 어플리케이션
- 입력은 React Hook Form 라이브러리를 이용해서 최대한 줄이고, 로직 구현에만 집중
- 기본 코드
  ```tsx
  import { useForm } from 'react-hook-form';
  import { atom, useRecoilState } from 'recoil';

  interface ToDo {
    id: number;
    text: string;
    category: 'TO_DO' | 'DOING' | 'DONE';
  }

  interface FormProps {
    ToDo: string;
  }

  const toDoState = atom<ToDo[]>({
    key: 'toDo',
    default: [],
  });

  const ToDoList = () => {
    const [toDos, setToDos] = useRecoilState(toDoState);
    const { register, handleSubmit, setValue } = useForm();
    const onSubmit = ({ ToDo }: FormProps) => {
      setToDos((prevToDos) => [{ id: Date.now(), text: ToDo, category: 'TO_DO' }, ...prevToDos]);
      setValue('ToDo', '');
    };

    return (
      <div>
        <h1>ToDos</h1>
        <hr />
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register('ToDo')} type='text' placeholder='Write a to do' />
          <input type='submit' value='Add' />
        </form>
        <ul>
          {toDos.map(({ id, text }) => (
            <li key={id}>{text}</li>
          ))}
        </ul>
      </div>
    );
  };

  export default ToDoList;
  ```

### JavaScript의 불변성에 대해서 (React관점으로)

- React에서는 useState() 훅을 이용해서 페이지의 상태를 관리하게 됨
- State변수는 기본적으로는 값을 담는 value와 값을 조정하는 modifier 함수를 별도로 지니게 됨
- 값의 경우에는 readonly 타입으로 값을 조정하는 setter를 통해서만 변수의 값이 변하며 이를 직접적으로 수정하고자 한다면 새로운 그릇에 변수를 담아서 변경된 그릇을 리턴해야 함
- ToDo 어플리케이션에서 활용한 소스코드
  ```tsx
  import { useRecoilState } from 'recoil';
  import { toDoState } from '../atoms';
  import ToDo from '../interfaces/ToDo';

  const BaseToDo = ({ text, category, id }: ToDo) => {
    const [toDos, setToDos] = useRecoilState(toDoState);
    const onClick = (newCategory: ToDo['category']) => {
      const targetPosition = toDos.findIndex((toDo) => toDo.id === id);
      const newToDo: ToDo = { text, id, category: newCategory };
      // replace with new ToDo
      setToDos((prevToDos) => {
        const newToDos = [...prevToDos];
        newToDos[targetPosition] = newToDo;
        return newToDos;
      });
    };
    return (
      <li>
        <span>{text}</span>
        {category !== 'DOING' && <button onClick={() => onClick('DOING')}>Doing</button>}
        {category !== 'TO_DO' && <button onClick={() => onClick('TO_DO')}>To Do</button>}
        {category !== 'DONE' && <button onClick={() => onClick('DONE')}>Done</button>}
      </li>
    );
  };

  export default BaseToDo;
  ```
  ```tsx
  const [toDos, setToDos] = useRecoilState(toDoState);
  // 이 부분이 state를 선언하는 부분
  // toDos라는 배열과, setToDos라는 setter함수를 이용해서 state를 선언한 뒤
  ```
  ```tsx
  setToDos((prevToDos) => {
    const newToDos = [...prevToDos];
    newToDos[targetPosition] = newToDo;
    return newToDos;
  });
  // setToDos를 이용해서 변경할때는 prev값을 받아오고 직접 수정할수가 없음
  // 왜냐하면, prevToDo의 경우에는 readonly로 지정되어 있으며,
  // 이를 직접 수정하는 것이 금지되어 있기 때문이다.
  // 따라서, 새로운 newToDos 배열을 기존 값을 복사하는 방식으로 만들어 낸 뒤,
  // 내용을 수정한 newToDos를 반환한다.
  ```
