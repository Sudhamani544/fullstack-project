import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'

const style = {
  color: 'white',
} as const
const Footer = () => {
  return (
    <footer className="footer">
      <section className="footer__icons">
        <a href="https://www.instagram.com/">
          <InstagramIcon sx={style} />
        </a>
        <a href="https://www.linkedin.com/">
          <LinkedInIcon sx={style} />
        </a>
        <a href="https://www.twitter.com/">
          <TwitterIcon sx={style} />
        </a>
      </section>
      <section>
        <a> &copy; Copyright 2021 </a>
      </section>
    </footer>
  )
}

export default Footer
