<template>
    <div style="height: 100%">
        <!-- <x-button type='primary' @click.native='showBoard'>show white board</x-button> -->
        <!--
            tool: pencil,eraser,text,line,rectangle,ellipse
        -->
        <!-- <whiteboard 
            tool='pencil' 
            v-show='isShow' 
            :background-image='imgUrl' 
            socket-host='http://192.168.8.31:8080'
            @showBoard='showBoard'
            :show-close-icon='true' 
            @save='saveImg'>                
        </whiteboard> -->
        <group>
            <x-button @click.native='goRoom("room1")'>room1</x-button>
            <x-button @click.native='goRoom("room2")'>room2</x-button>
            <x-button @click.native='goRoom("room3")'>room3</x-button>
        </group>
        <img :src='imgUrl' />
    </div>
</template>
<script type="text/javascript">
    import {XButton,Group} from 'vux'
    import whiteboard from '@/components/white-board'
    import VueSocketio from 'vue-socket.io'
    import imgUrl from '@/assets/imgs/paper.jpg'
    import { Loading } from 'vux'
    export default{
        data(){
            return{
                isShow:false,
                imgUrl:'',
                showMenu:false,
                socket:null
            }
        },
        components:{
            XButton,
            Group,
            whiteboard
        },
        created(){
            const self = this;    
            if((function(){try{return wx,true}catch(e){}}())){
                self.imgUrl = wx.setBackgroundImage();
            }    
        },
        activated(){
            const self = this;
        },
        sockets:{
            connect: function(){
                console.log('socket connected');
            },
            customEmit: function(val){
                console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
            }
        },
        methods:{
            goRoom(id){
                const self = this;
                // self.socket = io('http://192.168.8.31:8080');
                // self.socket.emit('join',id);
                self.$router.push({path:'/room/'+id})
            },
            saveImg(data){
                const self = this;
                console.log('imgUrl',data);
                if(wx){
                    wx.saveBase64(data);
                }
            },
            clickButton(){

            },
            showBoard(show){
                this.isShow = !this.isShow;
            },
        }
    }
</script>
<style scoped></style>