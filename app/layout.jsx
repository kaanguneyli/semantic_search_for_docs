
export const metadata = {
  title: "semantic search engine for docs",
  description: "semantic search engine for docs"
}


const RootLayout = ( {children} ) => {
  return (
    <html lang='en'>
      <body>
        <div className='main'></div>
        <main className='app'>
          {children}
        </main>
      </body>
    </html>
  )
}

export default RootLayout;