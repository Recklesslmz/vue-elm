<template>
  <div>
    <div>
      <v-header  :headerProps="headerProps"></v-header>
    </div>
    <div class="tab">
      <div :class="[tabList,{tabListChecked:chooseIndex==index}]" @click="choose(index)"
           v-for='(item,index) in tab'>
        {{item.name}}
      </div>
    </div>
    <div>
      <router-view></router-view>
    </div>

  </div>

</template>

<script type="text/ecmascript-6">
  import header from '../components/header/header'
  export default {
    data(){
      return {
        headerProps: {name:'1'},
        tab: [
          {name: '商品', type: 1},
          {name: '评价', type: 1},
          {name: '商家', type: 1}
        ],
        tabList: 'tabList',
        chooseIndex: ''
      }
    },
    beforeCreate(){
      document.getElementsByTagName('body')[0].style.background = '#faf5f7'
    },
    created(){

    },
    mounted(){
     this.$nextTick(()=>{
        this.getInfo()
      })
    },
    methods: {
      choose(index){
        this.chooseIndex = index
        switch (index) {
          case 0:
            this.$router.push({path: '/'})
            break
          case 1:
            this.$router.push({path: '/ratings'})
            break
          case 2:
            this.$router.push({path: '/seller'})
            break
        }
      },
      getInfo(){

        let _this = this

        this.$http.get('/api/seller').then((response) => {
          if(response.data.errno === 0){
            console.log(_this.headerProps)
            _this.headerProps = response.data.data
          }
          console.log(response)
        });
      }
    },
    components: {
      'v-header': header
    }
  }

</script>
<style lang="scss">
  .tab {
    display: flex;
    text-align: center;
    width: 100%;
    height: 40px;
    background: #fff;
    .tabList {
      flex: 1;
      line-height: 40px;
      font: {
        size: 14px;
      }
    ;
      color: rgb(77, 85, 93);
    }
    .tabListChecked {
      color: rgb(240, 20, 20);
    }
  }

</style>
