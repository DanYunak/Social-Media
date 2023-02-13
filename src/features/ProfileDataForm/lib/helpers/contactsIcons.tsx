import { FacebookOutlined, GithubOutlined, InstagramOutlined, TwitterOutlined, YoutubeOutlined, ChromeOutlined } from '@ant-design/icons'


export const contactsIcons = (key: string) => {
    if (key === 'facebook') {
        return <FacebookOutlined />
    }
    if (key === 'twitter') {
        return <TwitterOutlined />
    }
    if (key === 'instagram') {
        return <InstagramOutlined />
    }
    if (key === 'youtube') {
        return <YoutubeOutlined />
    }
    if (key === 'github') {
        return <GithubOutlined />
    }
    if (key === 'website') {
        return <ChromeOutlined />
    }
}