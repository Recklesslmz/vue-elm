<template>
  <div>
    <div class="content-wrapper">
      <div class="avatar">
        <img :src='headerProps.avatar'>
      </div>
      <div class="content">
        <div class="name">{{headerProps.name}}</div>
        <div class="description">{{headerProps.description}}</div>


      </div>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      headerProps:Object
    },
  }

</script>
<style lang="scss">
  .content-wrapper {
    height: 103px;
    background: rgba(7, 17, 27, .5);
    position: relative;
    .avatar{
      display: inline-block;
      padding: {
        top: 24px;
        left:24px;
      };
      img{
        width: 64px;
        height:64px;
        border-radius: 2px;
      }
    }
    .content{
      display: inline-block;

    }
  }

</style>
