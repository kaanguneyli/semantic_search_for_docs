
export const metadata = {
  title: "ui",
  description: "ui"
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