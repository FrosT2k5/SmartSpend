import classes from '../routes/css/dashboard.module.css';
import yashImageUrl from "/yash.svg";
import nandiniImageUrl from "/nandini.svg";
import sairajImageUrl from "/sairaj.svg";

const About = () => {
    return (
        <>
            <div className={classes.headingBox}>
                <h4 className={classes.textBold}>About Us</h4>
                <h4>Here you can find information about who we are and what we do.</h4>
            </div>

            <div className={ `${classes.largeBoxShort} ${classes.textCenter} ` }>
                <h3 className={classes.textBold}>Source Code</h3>
                <h4 className={classes.mt2}>The place where the magic lies and goodness forge.</h4>
                <div className={classes.mt2}>
                    <a 
                    className={classes.mt2} style={{display: "block"}}
                    href='https://github.com/FrosT2k5/SmartSpend_Backend'
                    target='_blank'>
                        <button style={{"width": "25%"}}>Backend Source</button>
                    </a>
                    <a 
                    className={classes.mt2} 
                    style={{display: "block"}}
                    href='https://github.com/FrosT2k5/SmartSpend_Backend'
                    target='_blank'>
                        <button style={{"width": "25%"}}>Frontend Source</button>
                    </a>
                </div>
            </div>
            <div className={`${classes.smallBox} ${classes.selfCenter}`}>
                <img src={yashImageUrl} width="30%" />
                <h4 className={classes.textBold}>Yash Patil</h4>
                <h4>I&apos;m passionate about Programming, Sci-fi, OpenSource and Philosophy while also Reading books.</h4>
            </div>

            <div className={`${classes.smallBox} ${classes.selfCenter}`}>
                <img src={sairajImageUrl} width="30%" />
                <h4 className={classes.textBold}>Sairaj Pai</h4>
                <h4>I&apos;m passionate about tabla, sci-fi, sitcoms, and movies, while also exploring coding and embracing diverse experiences.</h4>
            </div>

            <div className={`${classes.smallBox} ${classes.selfCenter}`}>
                <img src={nandiniImageUrl} width="30%" />
                <h4 className={classes.textBold}>Nandini Nichite</h4>
                <h4>Passionate about reading books and diving into coding, exploring new realms in literature and technology with enthusiasm.</h4>
            </div>
        </>
    );
};

export default About;
