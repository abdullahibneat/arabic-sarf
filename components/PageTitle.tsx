const PageTitle = ({ children }: { children: string }) => (
  /** pointer-events is used so that clicks can be passed through to the <PageHeader /> buttons */
  <div className="pointer-events-none sticky top-0 z-10 flex h-10 items-center justify-center px-16">
    <h2 className="pointer-events-auto overflow-hidden text-ellipsis text-nowrap">
      {children}
    </h2>
  </div>
)

export default PageTitle
