<template>
  <div class="goods">
    <div class="menu-wrapper">
        <div v-for="item in foods">
          <div class="text">{{item.name}}</div>
        </div>
    </div>
    <div class="foods-wrapper"></div>
  </div>

</template>

<script type="text/ecmascript-6">
  export default{
    data(){
      return {
          foods:[]
      }
    },
    created(){
      this.getGoods()
    },
    methods: {
      getGoods(){
        let _this = this
        this.$http.get('/api/goods').then((response) => {
          if (response.data.errno === 0) {
              _this.foods = response.data.data
            console.log(response)
          }
        });
      }
    }
  }

</script>
<style lang="scss">
  .goods{
    display: flex;
    position: absolute;
    width: 100%;
    overflow: hidden;
    top:173px;
    bottom:46px;
    .menu-wrapper{
      flex: 0 0 80px;
      background:#f3f5f7;
      .text{
        line-height:30px;
      }

    }
    .foods-wrapper{

    }


  }

</style>
