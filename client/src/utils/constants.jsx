import GitHubImage from '../svgs/GitHubImage';
import FacebookImage from '../svgs/FacebookImage';
import LinkedInImage from '../svgs/LinkedInImage';
import LinkImage from '../svgs/LinkImage';
import TwitchImage from '../svgs/TwitchImage';
import TwitterImage from '../svgs/TwitterImage';
import YoutubeImage from '../svgs/YoutubeImage';
import DevToImage from '../svgs/DevToImage';
import GitlabImage from '../svgs/GitlabImage';
// export const BASE_API_URL = "http://localhost:3000/api";
export const BASE_API_URL='/api';
export const PURPLE_COLOR = "#633CFF";
export const GREY_COLOR = '#737373';

export const options = [
    {
    value: 'GitHub',
    label: (
        <div className='dropdown-item'>
        <GitHubImage fill='#000' /> GitHub
        </div>
    ),
    },
    {
    value: 'LinkedIn',
    label: (
        <div className='dropdown-item'>
        <LinkedInImage fill='#000' /> LinkedIn
        </div>
    ),
    },
    {
    value: 'YouTube',
    label: (
        <div className='dropdown-item'>
        <YoutubeImage fill='#000' /> Youtube
        </div>
    ),
    },
    {
    value: 'Twitter',
    label: (
        <div className='dropdown-item'>
        <TwitterImage fill='#000' /> Twitter
        </div>
    ),
    },
    {
    value: 'Facebook',
    label: (
        <div className='dropdown-item'>
        <FacebookImage fill='#000' /> Facebook
        </div>
    ),
    },
    {
    value: 'Twitch',
    label: (
        <div className='dropdown-item'>
        <TwitchImage fill='#000' /> Twitch
        </div>
    ),
    },
    {
    value: 'Dev.to',
    label: (
        <div className='dropdown-item'>
        <DevToImage fill='#000' /> Dev.to
        </div>
    ),
    },
    {
    value: 'GitLab',
    label: (
        <div className='dropdown-item'>
        <GitlabImage fill='#000' /> GitLab
        </div>
    ),
    },
]

export const previewLinkColors = {
    github: 'bg-github',
    twitter: 'bg-twitter',
    facebook: 'bg-facebook',
    linkedin: 'bg-linkedin',
    twitch: 'bg-twitch',
    devto: 'bg-devto',
    gitlab: 'bg-gitlab',
    youtube: 'bg-youtube'
}

export const previewLinkIcons = {
    github: <GitHubImage />,
    twitter: <TwitterImage />,
    facebook: <FacebookImage />,
    linkedin: <LinkedInImage />,
    twitch: <TwitchImage />,
    'dev.to': <DevToImage />,
    gitlab: <GitlabImage />,
    youtube: <YoutubeImage />
}

export const isValidURL = (str)=>{
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
}