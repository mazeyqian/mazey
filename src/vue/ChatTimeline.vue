<template>
    <div class="mv-chat-timeline pinnacle-module">
        <h1>
            {{ headline }}
            <small>{{ subheadline }}</small>
        </h1>
        <div class="message-list">
            <template v-for="msg in messages">
                <div class="message-time">
                    <span>{{ msg.time }}</span>
                </div>
                <div :class="{'message-left': msg.direction === 'left', 'message-right': msg.direction === 'right'}">
                    <a :rel="msg.nickname">
                        <img :src="msg.portrait">
                    </a>
                    <div class="nickname">
                        {{ msg.nickname }}
                    </div>
                    <div class="message-content"
                        :class="{}"
                        v-html="newLine(msg.content)">
                    </div>
                    <div class="message-tag" v-if="typeof msg.event === 'object' && !Array.isArray(msg.event)">
                        <div class="tag-content">
                            <!--<i class="pinnacle-iconfont pinnacle-icon-biaoqian"></i>-->
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#pinnacle-icon-sekuaibiaoqian"></use>
                            </svg>
                            <span class="tag-content-text">{{ msg.event.eventMsg }}</span>
                        </div>
                    </div>
                    <div style="clear: both"></div>
                </div>
            </template>
        </div>
        <div class="message-send">
            <div class="send-portrait">
                <img :src="portrait"/>
            </div>
            <textarea
                    class="send-text"
                    placeholder="写下你的评论，Ctrl+Enter 发送。"
                    v-model="comment"
                    @focus="showSubmit = true"></textarea>
        </div>
        <div class="message-submit" v-show="showSubmit">
            <a class="message-btn-submit" @click="sendComment">发送</a>
            <a class="message-btn-cancel" @click="showSubmit = false">取消</a>
        </div>
    </div>
</template>

<script>
    import './chat-timeline.css'
    import {newLine} from "../../common/Common"

    export default {
        name: 'mv-chat-timeline',
        data () {
            return {
                comment: '',
                showSubmit: false
            }
        },
        props: {
            headline: {
                type: String,
                default: '评论列表'
            },
            subheadline: {
                type: String,
                default: ''
            },
            messages: {
                type: Array,
                default () {
                    return [
                        {
                            direction: 'left',
                            nickname: 'Admin',
                            portrait: 'http://www.mazey.net/app/remind/img/header/header-animal-1.jpg',
                            content: '暂无消息～',
                            time: '2018-07-03 18:06'
                        }
                    ]
                }
            },
            nickname: {
                required: true
            },
            portrait: {
                type: String,
                default: 'http://www.mazey.net/app/remind/img/header/header-girl-2.jpg'
            }
        },
        watch: {
            messages (n, o) {
                if (n.length > o.length) {
                    setTimeout(() => {
                        document.querySelector('.message-list').scrollTop = document.querySelector('.message-list').scrollHeight
                    }, 0)
                    // 如果是自己发送的清空
                    if (n[n.length - 1].nickname === this.nickname) {
                        this.comment = ''
                    }
                }
            }
        },
        created () {
            // 监听 ctrl + enter，发送
            document.onkeydown = e => {
                let [keyCode, ctrlKey] = [e.keyCode || e.which || e.charCode, e.ctrlKey || e.metaKey]
                if (keyCode === 13 && ctrlKey === true) {
                    // console.log(e.key)
                    this.sendComment()
                }
            }
        },
        mounted () {
            document.querySelector('.message-list').scrollTop = document.querySelector('.message-list').scrollHeight
        },
        methods: {
            newLine,
            sendComment() {
                if (!this.comment) {
                    return false
                }
                this.showSubmit = false
                this.$emit('chatTimelineComment', {comment: this.comment})
            },
            formatTime (d) {
                return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}`
            }
        }
    }
</script>