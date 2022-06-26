import { Switch } from "antd"
import { useEffect, useState } from "react"
import PostWait from './post-wait'
import Post from './post'

function PostManagement() {
    const [trueFalse, setTrueFalse] = useState(true)
    const handleSwitch = (bool) => setTrueFalse(!trueFalse)
    return (
        <>
            <Switch
                checkedChildren={<h2 style={{color: '#fff'}}>Tin chờ duyệt</h2>}
                unCheckedChildren={<h2 style={{color: '#fff'}}>Tin đã đăng</h2>}
                defaultChecked
                onChange={handleSwitch}
                style={{marginBottom: 20, height: 30}}
            />
            { trueFalse ? <PostWait/> : <Post/> }
        </>
    ) 
}

export default PostManagement