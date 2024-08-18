const Home = () => {
  const toggleSidebar = () => {
    document.querySelector('aside')?.classList.toggle('open')
  }
  return (
    <div>
      <h1>Hello World</h1>
      <button
        onClick={toggleSidebar}
        className="flex items-center gap-2 rounded-md bg-zinc-100 px-4 py-2 text-sm font-semibold leading-none text-zinc-900 hover:bg-zinc-200"
      >
        Open
      </button>
    </div>
  )
}

export default Home
