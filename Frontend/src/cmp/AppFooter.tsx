import gitHubLogo from '../assets/imgs/github-logo.png';

export function AppFotter() {
    return (
        <footer className="main-footer full">
            <div className="footer-logo flex direction-col align-center">
                <p>&copy; Currency Exchange by Michael Uzan</p>
                <img src="https://www.rewire.co.il/wp-content/uploads/2019/10/app_icon.png" />
            </div>
            <div className="footer-desc">
                <ul className="social-links clean-list flex direction-row justify-center">
                    <li>
                        <a target="_blank" href="https://github.com/Michael-Uzan/currency-exchange">
                            <p>See Code on GitHub Here: </p>
                            <img src={gitHubLogo} />
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}