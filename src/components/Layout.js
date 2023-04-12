import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="Layout">
        <header>
            <div className='LeftNavigation'>
                <img src={process.env.PUBLIC_URL + '/logo-icon-white.png'} alt='logo' />
                
                <div className='Links'>
                    <Link to='/'>
                        <h3>Welcome</h3>
                    </Link>
                    <Link to='/about'>
                        <h3>About</h3>
                    </Link>
                    <Link to='/write'>
                        <h3>Write</h3>
                    </Link>
                </div>
            </div>

            <h1>⌕</h1>        
        </header>

        <Outlet />
        
        <footer>
            <p>Not affiliated with FISD&emsp;&emsp;&emsp;|&emsp;&emsp;&emsp;tadahiroueta@gmail.com</p>
        </footer>
    
    </div>
  );
}