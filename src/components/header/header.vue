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
    <div class="bulletin">
      {{headerProps.bulletin}}
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      headerProps: Object
    },
  }

</script>
<style lang="scss">
  .content-wrapper {
    height: 103px;
    background: rgba(7, 17, 27, .5);
    position: relative;
    .avatar {
      display: inline-block;
      padding: {
        top: 24px;
        left: 24px;
      }
    ;
      img {
        width: 64px;
        height: 64px;
        border-radius: 2px;
      }
    }
    .content {
      display: inline-block;
      .name {
        position: relative;
        top:-38px;
        font: {
          size:16px;
          weight: bold;
        }
      ;
        color: #fff;
      }
      .description{
        position: relative;
        top:-28px;
        color: #fff;
        font:{
          size: 12px;
          weight: 200;
        };
      }

    }

  }
  .bulletin{
    width: 100%;
    height:28px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    background: rgba(7,17,27,.2);
    font: {size: 14px;weight: 200};
    color: #fff;
    line-height: 28px;
  }

</style>
