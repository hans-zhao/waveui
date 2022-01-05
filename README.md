

***打包发布还是要编译为js/css格式，这样被引用之后，浏览器可以识别***

## Available Scripts

In the project directory, you can run:


### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
运行 tsconfig.build.json 编译 .tsx / .css

* module：当前格式，
* target：输出格式,
* declaration：生成.d.ts文件，便于类型提示（发布的库是js格式的，类型已经被忽略，d.ts就是用来告诉tsc你定义的都是些什么鬼的）
* "jsx": "react" 用于*React*.*createElement* 编译



## `npm link`

项目打包后在本地测试，才能正式发布

同时避免 每次 UI库修改后，要上传到npm再下载到demo项目测试的麻烦

原理：在demo项目的node_modules下创建快捷方式，最终引入了编译后的 UI库的入口文件（package.json中的main和module来指定 ，其中module是commonjs的规范, types用于tsc）

**步骤：**

1. 在UI库项目运行 npm link
2. 在demo项目运行 npm link wave
3. 在demo项目package.json手动添加 wave依赖
4. 在demo项目引入UI库的样式和组件
5. 启动demo项目

You might have more than one copy of React in the same app 问题

 在UI库 运行 npm link ../react-demo/node_modules/react 



## 测试

避免人肉测试

避免在浏览器上一个一个添加组件、组件的props等 来测试

------



## storybbok

使用storybook展示组件、演示交互、自动生成文档

**生成文档说明：**

文档包含两部分 1. tables用于展示props；  2. comments用于describe每个prop

只需要写comments，addon-doc（addon-essentials自动安装）插件会自动抓取props，生成table和description 

## 发布到npm

1. 切换到npm源 npm config set registry https://registry.npmjs.org/  （淘宝源 npm config set registry http://registry.npm.taobao.org/）

2. 登录npm（注意发包的name必须独有，否则会被认为账号错误）

3. **修改package.json**

   files字段：哪些文件需要publish，

   prepublish命令：钩子函数，在publish前自动运行（用于publish之前重新build）

4. **peerDependencies**

   ```
   {
     "peerDependencies": {
       "react": ">=16.12.0",
       "react-dom": ">=16.12.0"
     }
   }
   // 同时需要把react、react-dom 放到devDependencies中，就可以满足本地开发和发布的要求
   ```

   在第三方库中peerDependencies的依赖，用于在安装第三方库时，避免重复安装依赖（且可能安装了多个版本，如下）

   ```asciidoc
   .
   ├── helloWorld
   │   └── node_modules
   │       ├── packageA
   │       ├── plugin1
   │       │   └── nodule_modules
   │       │       └── packageA
   │       └── plugin2
   │       │   └── nodule_modules
   │       │       └── packageA
   ```

peerDependencies特点

- 如果用户显式依赖了核心库，则可以忽略各插件的 `peerDependencies` 声明；

- 如果用户没有显式依赖核心库，则按照插件 `peerDependencies` 中声明的版本将库安装到项目根目录中；

- 当用户依赖的版本、各插件依赖的版本之间不相互兼容，会报错让用户自行修复；

  ```asciidoc
  .
  ├── helloWorld
  │   └── node_modules
  │       ├── packageA
  │       ├── plugin1
  │       └── plugin2
  ```

#### 发布规范和提交规范

1. 通过单元测试 test  test:nowatch 用于测试完成直接返回结果停止监视（单元测试默认一直在执行监视）

2. 符合代码规范 eslint
3. 使用husky来push和commit（eslint  prettier lint-staged  commitlint等工具检查代码规范、风格，日志格式）

### 最后静态文档生成和部署到静态服务器
travis（https://www.travis-ci.com/）  netlify 


![image-20220104160305798](C:\Users\bocha\AppData\Roaming\Typora\typora-user-images\image-20220104160305798.png)

