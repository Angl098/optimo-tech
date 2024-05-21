import React from 'react'
import style from './Footer.module.css'
import facebook from '../../assets/facebook.png'
import instagram from '../../assets/instagram.png'
import linkedin from '../../assets/linkedin.png'
import twitter from '../../assets/twitter.png'

export default function Footer() {
    return (
        <div className={style.footer}>
            <div className={style.sbFooter}>
                <div className={style.footerLinks}>
                    <div className={style.linksDiv}>
                        <h4>For Business</h4>
                        <a href="">
                            <p>Employer</p>
                        </a>
                        <a href="">
                            <p>Employer</p>
                        </a>
                    </div>
                    <div className={style.linksDiv}>
                        <h4>Resources</h4>
                        <a href="">
                            <p>Employer</p>
                        </a>
                        <a href="">
                            <p>Employer</p>
                        </a>
                    </div>
                    <div className={style.linksDiv}>
                        <h4>Partners</h4>
                        <a href="">
                            <p>Swing Tech</p>
                        </a>
                    </div>
                    <div className={style.linksDiv}>
                        <h4>Company</h4>
                        <a href="">
                            <p>About</p>
                        </a>
                        <a href="">
                            <p>Career</p>
                        </a>
                        <a href="">
                            <p>Contact</p>
                        </a>
                    </div>
                    <div className={style.linksDiv}>
                        <h4>Coming soon</h4>
                        <div className={style.socialmedia}>
                            <p><img src={facebook} alt="" /></p>
                            <p><img src={twitter} alt="" /></p>
                            <p><img src={linkedin} alt="" /></p>
                            <p><img src={instagram} alt="" /></p>
                        </div>
                    </div>
                </div>

                <hr />

                <div className={style.footerBelow}>
                    <div className={style.footerCopyright}>
                        <p>
                            @{new Date().getFullYear()} CodeOP. All right reserved.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}