

## 📒 목차

1. <a href="#babel">babel?</a>

2. <a href="#webpack">webpack?</a>

3. <a href="#step1">babel 적용하기</a>

4. <a href="#step2">webpack 적용하기</a>

5. <a href="#step3">style 관련 loader 적용하기 (feat. sass-loader)</a>
6. <a href="#step4">file-loader, url-loader 적용하기</a>
7. <a href="#step5">모듈을 절대경로로 불러오기</a>
8. <a href="#step6">webpack으로 개발서버 띄우기</a>
9. <a href="#step7">개발서버, 실서버 환경 분리하기</a>
10. <a href="#step8">후기</a>



<h2 id="babel">🤔 babel</h3>

### babel?

공식문서에서는 babel을 다음과 같이 표현한다.

> Babel is a JavaScript compiler. Use next generation JavaScript

babal은 최신 버전의 자바스크립트 문법(보통 ES6+)을 이전 버전의 자바스크립트 문법으로 변환시켜주는 트랜스 컴파일러다. 

예를들어, 개발자가 아래와 같이 코딩했다면

```javascript
const sayHello = (name) => console.log('hello ${name}')
```

이렇게 바뀐다.

```javascript
var sayHello = function sayHello(name) {
  return console.log("hello ".concat(name));
};
```

하지만 babel을 사용한다고 해서 모든 자바스크립트 최신 문법을 사용할 수 있는건 아니다. `Array.from` 이나 `Object.assign()` 등 기존에 문법에 없던 문법은 **pollyfill(코드 조각)**을 추가하여 지원하게 해야한다.

> **pollyfill**
>
> 자바스크립트의 최신기술을 구버전 브라우저에서 사용하기 위해서는 변화과 함께 폴리필도 사용해야 한다. 폴리필은 **런타임 기능 주입**을 말한다. 런타임 기능 주입이 뭐야? 한다면, **브라우저에서 코드가 실행될 때 기능이 있는지 없는지 확인한 뒤 없을 경우에만 코드 변환을 하는 기능을 말한다**

### babel의 동작원리

> Source Code => AST => modified AST =>  Source Code

**1. 파싱**

소스코드를 읽어서 파싱 후 추상구문트리(AST)를 생성한다. AST의 각 노드는 소스코드의 구조를 의미한다. 추상구문트리가 궁금하면 [여기](https://astexplorer.net/#/gist/90bc74fbaaee4050afadca33d2899470/latest)를 참고한다.

**2. 변환**

1단계에서 작성한 추상구문트리를 가져와서 각 브라우저에 맞게 변환한다. 여기서 바벨 설정에 추가한 plugin들이 적용된다.

**3. 코드 생성**

2단계에서 변형된 AST를 실제 브라우저 환경에 맞는 소스코드로 변환한다.

<br/>

<h2 id="webpack">🤗 Webpack</h2>

### Webpack?

Webpack은 모듈번들러다. 즉 여러개의 파일을 하나로 합쳐주는 도구이다. 

![image](https://user-images.githubusercontent.com/39187116/87876681-ce72ad00-ca14-11ea-804d-f65b58aa1ce1.png)

<div style="text-align: center">webpack 공식문서 메인사진</div>

### Webpack에서 Loader?

Webpack은 모든 파일을 모듈로 관리한다. Js 파일 뿐만 아니라 이미지, 폰트, 스타일시트도 전부 모듈로 관리한다. 그러나 webpack은 js밖에 모른다. 비 js 파일을 웹팩이 이해하게끔  변경해야하는데 로더가 이 역할을 담당한다.

로더는 `test`와 `use`키로 구성된 객체로 설정할 수 있다. `test`에 로딩할 파일을 지정하고 `use`에 적용할 로더를 설정한다. 대표적인 로더는 `babel-loader`, `css-loader`, `sass-loader`등이 있다.

### Webpack을 사용하는 이유?

**1. 모듈간의 의존성 문제를 해결**

Webpack이 모듈간의 의존성을 계산해서 번들링 해줌

**2. 네트워크 병목을 줄여줌**

`<script>` 태그를 여러개 사용하여 웹 페이지를 로드하면 네트워크 병목현상이 생길 수 있다. 이런 문제를 해결하려면, 하나의 JS파일로 로드하면 되지만 하나의 JS파일로 개발할 경우 코드의 가독성이나 전역공간의 오염 같은 문제가 발생하게 된다. Webpack은 여러개의 파일을 하나로 묶어주기 때문에 이와 같은 문제를 해결할 수 있고 네트워크 병목현상을 최소화할 수 있다.

**3. 모듈단위의 개발이 가능하다!**

모듈단위의 개발이 가능하기 때문에, 코드의 가독성도 높이고? 유지보수 효율도 높이고? 스코프에 신경쓰지 않고 개발해도 된다. 또 라이브러리간 종속 문제를 고민할 필요가 없다. (Webpack이 entry point 부터 종속성을 계산하기 때문)

**4.코드를 압축, 최적화할 수 있다.**

하나의 파일로 압축시켜주고, plugin을 이용해서 최적화도 가능하다.

**5. ES6+ 스크립트를 지원한다.**

webpack은 babel-loader를 사용하여 babel을 지원하기 때문에 컴파일 과정에서(코드를 번들링하는 과정에서) 구형 브라우저가 사용 가능한 문법으로 코드를 변환해 준다.

등등......

### Webpack의 동작원리?

1. entry file의 의존성을 분석한다.
2. 다음 파일의 의존성을 분석한다. 
3. 모든 파일의 의존성을 분석할 때 까지 2번 과정을 반복한다.
4. 3번 까지의 과정을 토대로 종속성 그래프를 만들고 이 그래프를 사용하여 모든 모듈을 하나(또는 여러개)의 bundle 파일로 합친다.

<br/>

<h2 id="step1">😇 Babel 적용하기</h2>

**1. 기본환경 설정**

```bash
npm init -y
mkdir src
cd src
vi index.js
```

**2. index.js**

```javascript
const foo = [1, 2, 3, [4, 5]];
console.log(foo.flat());
```

**3. 필요한 module install**

```bash
npm i @babel/core @babel/cli @babel/preset-env -D
```

- `@babel/core`: babel을 사용하기 위한 필수 패키지
- `@babel/cli`: babel을 터미널에서 커맨드를 입력해서 사용하기 위한 패키지 ( 선택사항 )
- `@babel/preset-env`: babel의 공식 preset중 하나이며 필요한 플러그인 들을 프로젝트 진행환경에 맞춰서 동적으로 결정해 준다. 형식이 `browserlist` 형식이기 때문에 `.browserlistrc` 파일을 만들어 상세하게 설정 가능하다. 설정하지 않으면 기본값으로 설정된다.

모듈을 설치할 때 `-D` 옵션으로 설치 했는데 이는 `package.json` 파일의 `devDependencies` 항목에 추가하겠다는 의도이다. `devDependencies`는 개발이나 테스트 환경에서 필요한 패키지를 의미한다. 

> 추가적으로, `dependencies` 옵션은 프로덕션 환경(실제 서비스환경)에서 필요한 패키지를 의미한다!

**4. babel config 설정**

babel 설정을 위해 root 디렉토리에 `babel.config.js` 파일을 생성한다.

```javascript
module.exports = function (api) {
  api.cache(true);

  const presets = [
    [
      "@babel/preset-env",
      {
        targets: "> 0.25%, not dead",
      },
    ],
  ];

  return {
    presets,
  };
};

```

- `api.cache(true)` : babel 설정 파일을 한번만 실행하겠다는 뜻. 다른 옵션은 [여기](https://babeljs.io/docs/en/config-files#apicache)를 참고한다.
- `targets` 속성은 지원하는 브라우저의 범위를 정한다.

**5. pollyfill 추가**

`index.js` 의 `flat`함수는 많은 브라우저에서 지원하지 않는다.([참고](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/flat))  따라서 pollyfill을 추가해 줘야한다. 대표적으로 많이 쓰는 pollyfill은 corejs@3 이다. 예전에는 @babel/pollyfill도 많이 사용했는데 성능상의 이슈가 있어서 7.4버전 이후로 deprecated 되었다.

```bash
npm i core-js@3 -D
```

**babel.config.js**

```javascript
module.exports = function (api) {
  api.cache(true);

  const presets = [
    [
      "@babel/preset-env",
      {
        targets: "> 0.25%, not dead",
        useBuiltIns: "usage",
        corejs: 3,
        modules: false,
      },
    ],
  ];

  return {
    presets,
  };
};

```

- `useBuiltIns`: pollyfill을 필요한것만 import 할지?말지? 설정 `usage`는 필요한 것만, `entry`는 전부 다 추가해줌. 추가적으로 `usage`로 설정하면 JS코드를 읽는 브라우저를 검사하여 해당 브라우저에 없는! syntax만 pollyfill로 추가해줌!
- `modules`: ES6 module syntax를 사용할지?말지? 설정. `true`로 설정하면 `import, export` 를 `require, module.exports`로 대체하게 된다. 위에서 `false`로 설정한 이유는 후에 사용할 Webpack의 Tree Shaking이 `import, export`로 동작하기 때문에 `false`로 설정했다. `Tree Shaking`에 관한 내용은 [여기]([https://medium.com/naver-fe-platform/webpack%EC%97%90%EC%84%9C-tree-shaking-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0-1748e0e0c365](https://medium.com/naver-fe-platform/webpack에서-tree-shaking-적용하기-1748e0e0c365)) 를 참고하자.

**6. babel 실행**

```bash
npx babel src/index.js
```

**확인**

```javascript
import "core-js/modules/es.array.flat";
import "core-js/modules/es.array.unscopables.flat";
var foo = [1, 2, 3, [4, 5]];
console.log(foo.flat());
```

<br/>

<h2 id="step2">😊 Webpack 적용하기</h2>

**1. 필요 module install**

```bash
npm i webpack webpack-cli - D
```

**2. webpack.config.js 작성**

프로젝트 root 디렉토리에 webpack.config.js 파일을 생성한다.

```javascript
const path = require("path");

const config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "build.js",
  },
};

module.exports = config;
```

- `entry` : webpack이 의존성 분석하는 시작점이다.
- `output` 빌드한 결과물을 저장할 `path`와 `filename`을 설정한다. 위 설정은 root 디렉토리의 dist 폴더에 번들된 파일을 저장하고 파일이름을 build.js로 하겠다는 뜻

**3 webpack 실행**

`package.json` 파일의 `scripts` 부분에 build 커맨드 추가.

```
  "scripts": {
    "build": "webpack",
  },
```

 터미널에 `npm run build`

**4. babel loader 적용**

위에서 단순히 Webpack 으로만 빌드하면 적절히 트랜스파일링된 코드를 얻을 수 없다. babel을 webpack에 적용해서 코드를 트랜스파일링 해보자

babel을 webpack에 적용하기 위해선 `babel-loader` 모듈 설치가 필요하다.

```bash
npm i babel-loader -D
```

**webpack.config.js**

```javascript
const path = require("path");

const config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "build.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
};

module.exports = config;

```

<br/>

<h2 id="step3">😎 style 관련 loader 적용하기</h2>

### 1. css-loader

```bash
npm i css-loader -D
```

**1-1. 왜 씀?**

webpack은 모든 파일을 모듈로 관리한다. 하지만 webpack은 js밖에 모른다. 따라서 css 파일을 js파일로 변환해 로딩해야한다. `css-loader`는 

```javascript
import './index.css'
```

css 파일을 `import`할 수 있게 해주고,

```javascript
// build.js
....
...........push([n.i,"body {\n  background-color: green;\n}\n",""])......
```

bundle하는 과정에서 위와같이, css 코드를 js코드로 변환해준다.

**1-2. 적용하기**

**webpack.config.js**

```javascript
...생략
module: {
  rules: [
    {
      test: /\.js$/,
      use: "babel-loader",
      exclude: /node_modules/,
    },
    {
      test: /\.css$/,
      use: ["css-loader"],
    },
  ],
 },
```

### 2. style-loader

```bash
npm i style-loader -D
```

**1-1. 왜 씀?**

`css-loader` 에 의해 모듈로 변경된 스타일 시트는 돔에 추가되어야만 브라우져가 해석할수 있다. `style-loader`는 자바스크립트로 변경된 스타일시트를 동적으로 `head`태그에 추가하는 로더이다. 보통 CSS를 번들링하기 위해서는 css-loader, style-loader를 함께 사용한다.

**1-2. 적용하기**

`css-loader`를 추가했던 부분 앞에 `style-loader`를 추가해준다.

**webpack.config.js**

```javascript
...생략
{
  test: /\.css$/,
  use: ["style-loader", "css-loader"],
},
        
```

`use`는 끝에서부터 왼쪽으로 해석한다. 즉 `css-loader`가 적용된 후 `style-loader`가 적용된다.

**1-3. 고민해볼 부분**

`style-loader`를 적용하면 스타일을 적용할 수 있는데 `head`태그에 파일 수 만큼 `<style>` 태그가 생기게 된다.

```html
<head>
  <style>
  	... 샬라샬라
  </style>
  <style>
  	... 샬라샬라
  </style>
</head>
```

이 `style` 코드를 따로 파일로 관리하면 좋지않을까?

### 3. Mini-css-extract-plugin

`style-loader`는 파일의 수 만큼 `head` 태그에 `style`태그가 생긴다. 이게 마음에 들지 않아서 찾아보니 css파일을 따로 빼서 파일로 관리해주는 플러그인이 있었다.

```
npm i mini-css-extract-plugin -D
```

**webpack.config.js**

```javascript
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "build.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css", // 원하는 filename
    }),
  ],
};

module.exports = config;
```

위와같이, 모듈을 `require`해서 `style-loader` 부분에 적용하면 된다. 이와같이 적용하면 style.css 파일에 따로 스타일시트가 모이게 된다.

`MiniCssExtractPlugin`을 적용하면 `style-loader`는 더이상 필요가 없다. 지워주자

```bash
npm uninstall style-loader
```

### 4. sass-loader

`sass-loader`는 `.scss`, `.sass` 파일을 `import`할 수 있게 하고, 이를 읽어서 `css` 파일로 컴파일 변환시킨다. 따라서 이를 적용하면 `.scss` 작성하여 스타일을 추가할 수 있다.

```
npm i sass-loader -D
```

`sass-loader`는 .scss 파일을 읽어서 .css파일로 변환 시켜줘야 하기 때문에 `css-loader`보다 우선순위가 높다.

**webpack.config.js**

```javascript
{
 test: /\.(sa|sc|c)ss$/,
 use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
},
```

- `test`하는 파일을 `.sass`, `.sass`도 추가했고,
- 로더의 맨 앞에 `sass-loader`를 추가했다.

**node-sass**

```bash
npm i node-sass
```

추가적으로 `node-sass` 모듈도 설치하자. 공식 문서에 따르면

> node-sass allows you to natively compile .scss files to css at incredible speed and automatically via a connect middleware.

아주 빠르게 css 파일로 컴파일 시켜준다는데 원리는 조금 더 알아봐야할 것 같다.

<br/>

<h2 id="step4">😋 file-loader, url-loader 적용하기</h2>

### file-loader

webpack은 모든 파일을 모듈로 관리하는데, 이는 file도 예외가 아니다. 따라서 파일을 관리하기 위해서는 `file-loader`를 추가해줘야 한다. 추가적으로 `file-loader`는 실제로 사용되는 파일만 **복사**해서 적용한다.

```bash
npm i file-loader -D
```

**webpack.config.js**

```javascript
...생략 
{
   test: /\.js$/,
   use: "babel-loader",
   exclude: /node_modules/,
 },
 {
  test: /\.(sa|sc|c)ss$/,
  use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
 },
 {
  test: /\.(png|jpe?g|gif|svg|ico)$/,
  use: [
      {
        loader: "file-loader",
        options: {
          name: "images/[name].[ext]?[hash]",
        }
      },
 ],
},
```

`file-loader`를 적용하면 file을 `import` 해서 사용할 수 있다. 예시는 아래와 같다.

```javascript
import woowa from './woowabros.png'

const $img = document.createElement('img')
$img.src = woowa
$img.alt = 'this is woowabros png'
document.body.appendChild($img)
```

 추가적으로 options의 `name`값에 hash를 설정하면, rebundle시 기존의 hash된 파일을 사용해서 불필요한 복사를 막는다.

### url-loader

`file-loader`는 파일을 복사해서 해싱한 후 사용한다. `url-loader`는 `file-loader`의 기능을 base로 작은 파일이나, 글꼴은 파일로 복사하지 않고 `toString('base64')` 로 문자열로 변환하여 bundle 파일에 넣는다. (bunlde 파일이 더 가벼워 지겠군)

**webpack.config.js**

```javascript
// 생략
{
  loader: "url-loader",
  options: {
    name: "images/[name].[ext]?[hash]",
    limit: 10000
	}
},
```

- `file-loader`로 설정한 부분을 `url-loader`로 바꿔주기만 하면된다. 

- `limit`값의 의미는 10kb(10000) 미만의 파일을 `url-loader`로 처리하겠다는 뜻
- `url-loader`는 `file-loader`가 있어야 동작한다. 따라서 `file-loader`를 지우면(모듈을 uninstall) 안된다.

<br/>

<h2 id="step5">🎃 모듈을 절대경로로 불러오기</h2>

개발을 하다보면 상대경로로 모듈을 불러오는게 너무 보기싫다ㅜㅜ babel plugin을 이용하면 이를 절대경로로 불러올 수 있다.

`module-resolver`라는 plugin을 설치하자.

```bash
npm i babel-plugin-module-resolver -D
```

**babel.config.js**

```javascript
module.exports = function (api) {
  api.cache(true);

  const presets = [
    [
      "@babel/preset-env",
      {
        targets: "> 0.25%, not dead",
        useBuiltIns: "usage",
        corejs: 3,
        modules: false,
      },
    ],
  ];

  const plugins = [
    "module-resolver",
    {
      root: ["./src"],
      alias: {
        imgs: "./public/images",
      },
    },
  ];

  return {
    presets,
    plugins,
  };
};
```

- `root`는 사용자 정의 프로젝트 루트를 지정한다.

- 위와같이 설정하면 `./src/path/subPath` 경로의 무언가를 가져올 때 `path/subPath` 로 가져올 수 있다.

- `alias`는 말그대로 별명인데 여러개의 경로에 별칭을 줘서 파일을 가져올 때 쉽게 가져올 수 있다. 위에서는 `imgs`라는 별칭으로 `/public/images` 경로를 설정했다. 만약에 예시로, `./public/images` 라는 경로에 `woowabros.png`라는 이미지가 있다면 아래와 같이 사용할 수 있다.

  ```javascript
  import woowa from 'imgs/woowabros.png'
  ```

<br/>

<h2 id="step6"> 🥳 Webpack으로 개발서버 띄우기</h2>

webpack으로 빌드한 후 서버를 띄우기 위해서는 `webpack-dev-server` plugin이 필요하다.

```bash
npm i webpack-dev-server -D
```

**webpack.config.js**

```javascript
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "build.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[name].[ext]?[hash]",
              limit: 10000,
            },
          },
        ],
      },
    ],
  },
  /* webpack-dev-server */
  mode: "development", // webpack-dev-server에만 쓰는 것은 아님
  devtool: "inline-source-map",// webpack-dev-server에만 쓰는 것은 아님
  devServer: {
    contentBase: "./dist",
    port: 9000,
    hot: true,
  },
  /* webpack-dev-server */
  
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
  ],
};

module.exports = config;

```

- `mode`: `webpack-dev-server`에서만 쓰이는 옵션은 아니지만 넣어야할 때가 된것같다. 이 옵션은 `development`와 `production`, `none` 3개 옵션이 있는데 각 옵션마다 기본적으로 설정되는 플러그인, NODE 환경변수(process.env)가 다르다. 자세한 사항은 [여기](https://ibrahimovic.tistory.com/51) 를 참고하자
- `devtool` : debug tool을 정해준다. source-map은 원본 소스와 난독화된 소스를 맵핑 시켜주는 하나의 방법이다. 자세한 사항은 [여기](https://perfectacle.github.io/2016/11/14/Webpack-devtool-option-Performance/) 를 참고하자
- `contentBase` : 서버를 띄울 때 서빙할 폴더 설정
- `port`: 서버를 띄울 port
- `hot`: 코드가 수정되면 자동으로 re-build 한다.
- webpack-dev-server의 빌드 결과물은 사실, 실제 파일로 빌드되진 않고 메모리에 저장된다.

**package.json**

scripts 부분에 추가해준다.

```json
...생략
"build": "webpack-dev-server --open --config webpack.config.js",
```

추가한 뒤 `npm run build` 커맨드로 9000 포트에 개발 서버를 띄울 수 있다.

<br/>

<h2 id="step7"> 😸 개발서버, 실서버 환경 분리하기</h2>

`webpack-dev-server`는 개발 환경에만 종속되는 plugin이기도 하고 개발서버, 실서버 환경을 분리해서 작성해주는게 좋기 때문에 나눠보자. 이때 공통된 속성을 정의해서 불러오기 위해 `webpack-merge` 모듈이 필요하다

```bash
npm i webpack-merge -D
```

**webpack.common.js**

```javascript
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

const config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "build.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              // useRelativePath: true,
              name: "images/[name].[ext]?[hash]",
              // publicPath: "./dist/",
              limit: 10000,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
    new CleanWebpackPlugin({ filename: "build.js" }),
  ],
};

module.exports = config;
```

`webpack-dev-server` 관련 코드를 제거하고 `CleanWebpackPlugin` 설치하여 추가적으로 적용했다. `CleanWebpackPlugin`은 re-build될 때 기존의 결과물을 제거해준다.

**webpack.development.js**

```javascript
const commonConfig = require("./webpack.common");
const { merge } = require("webpack-merge");

module.exports = merge(commonConfig, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
    port: 9000,
    hot: true,
  },
});

```

공통으로 설정한 config 모듈을 불러와서 `merge` 시켰다.

**webpack.proud.js**

```javascript
const commonConfig = require("./webpack.common");

const prodConfig = {
  ...commonConfig,
  mode: "production",
};

module.exports = prodConfig;
```

이것은 production 환경.

config 파일을 분리했으니 `package.json`의 scripts도 수정해야한다.

**package.json**

```json
...생략
"build": "webpack-dev-server --open --config webpack.dev.js",
"build:production": "webpack --config webpack.prod.js",
```

- `npm run build`는 webpack-dev-server로 개발서버를 띄우고 webpack.dev.js를 참조한다.
- `nom run build:production`은 개발서버를 띄우지 않고 번들링만 한다. 그리고 webpack.prod.js를 참조한다.

<br/>

<h2 id="step8">👿 후기</h2>

누가 webpack은 학문을 공부하는 것이라고 했던 것 같은데, 막상 해보니까 진짜인 것 같다. 해도 해도 끝이 없이 나온다 (옵션들이..). 하지만 이번 경험을 토대로 혼자 프론트엔드 개발 환경 셋팅을 어느정도 할 줄 알게 된 것 같다. babel & wepack 설정 이라는 두려움도 없어지고 ㅎㅎ,, 개발을 하면서 그떄 그때 필요한 플러그인들을 적용하며 알아가고 일단은 여기까지만 해야겠다..



## Reference

1. https://babeljs.io/docs/en/
2. https://moonformeli.tistory.com/28
3. https://beomy.tistory.com/41
4. [https://github.com/parkjihwanjay/boilerplate/wiki/webpack,-babel-%EC%84%A4%EC%A0%95](https://github.com/parkjihwanjay/boilerplate/wiki/webpack,-babel-설정)
5. https://github.com/hg-pyun/minipack-kr/blob/master/src/minipack.js
6. [https://github.com/jungcome7/5.Study/blob/master/dependencies%20vs.%20devDependencies.md](https://github.com/jungcome7/5.Study/blob/master/dependencies vs. devDependencies.md)
7. https://poiemaweb.com/es6-babel-webpack-1
8. [https://medium.com/naver-fe-platform/webpack%EC%97%90%EC%84%9C-tree-shaking-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0-1748e0e0c365](https://medium.com/naver-fe-platform/webpack에서-tree-shaking-적용하기-1748e0e0c365)
9. http://jeonghwan-kim.github.io/js/2017/05/15/webpack.html

9. https://wonism.github.io/react-native-alias/
10. https://ibrahimovic.tistory.com/51
11. https://perfectacle.github.io/2016/11/14/Webpack-devtool-option-Performance/
