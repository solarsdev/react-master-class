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

      ```jsx
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

      ```jsx
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

      ```jsx
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

      ```jsx
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
