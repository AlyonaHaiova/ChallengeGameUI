import './ContactUs.css'

const ContactUs = () => {
    return (
        <a href="/help/#contact-us-email">
        <div className="letter-image letter-small">
            <div className="animated-mail">
                <div className="back-fold"></div>
                <div className="letter">
                    <div className="letter-border"></div>
                    <div className="letter-title"></div>
                    <div className="letter-context"></div>
                    <div className="letter-stamp">
                        <div className="letter-stamp-inner"></div>
                    </div>
                </div>
                <div className="top-fold"></div>
                <div className="body"></div>
                <div className="left-fold"></div>
            </div>
            <div className="shadow"></div>
        </div>
        </a>
    )
}

export default ContactUs;