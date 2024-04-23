function Footer() {
  return (
    <footer
      className="py-4"
      style={
        {
          backgroundColor: '#1E1E1E',
          color: 'white'
        }
      }>
      <div className="container">
        <div className="row small opacity-75">
          <div className="col-md-8">
            ©2024 EDMS. Development and support of corporate software. All rights reserved.
          </div>
          <div className="col-md-2 text-end">
            Astana, Kazakhstan
          </div>
          <div className="col-md-2 text-end">
            +7 775 445 75 45
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer