const PageTitle = ({ children }: { children: string }) => {
  return (
    <div className="pointer-events-none sticky top-0 z-10 flex h-10 items-center justify-center">
      <h2 className="pointer-events-auto">{children}</h2>
    </div>
  )
}

export default PageTitle
