// TypeScript 是给每一个变量、形参、函数（入参和返回值）定义明确的类型
// 1. 能够提供更好的语法提示
// 2. 能够检测出潜在的问题

// 函数组件，Props 类型如何定义

type ChildProps = {
  age: number
  dom: React.ReactNode
}

function Child({ age, dom }: ChildProps) {
  return (
    <>
      <div>{age.toString()}</div>
      {dom}
    </>
  )
}

function App() {
  const dom = <div>dom</div>

  return (
    <div>
      <Child age={18} dom={dom} />
    </div>
  )
}

export default App
