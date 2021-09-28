<template lang="html">

  <div class="landing-page">
    <!-- header -->
    <header class="landing-header">
      <!-- logo -->
      <img class="landing-logo" src="../assets/img/logo.png" alt="">

      <!-- info -->
      <div class="info">
        <p class="p1">
          هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد
        </p>
        <p class="p2">
          ...هذا النص
          <span class="mdi mdi-access-point"></span>
        </p>
      </div>
      <!-- end info -->

      <!-- search bar -->
      <form class="search-bar">
        <div class="topp">
          <label for="searchBar">
            <span class="mdi mdi-shield-search"></span>
          </label>
          <input type="text" id="searchBar" placeholder="إسم المكان الذى تريد أن تبحث عنه..">
          <v-select :options="options" placeholder="المدينة"> </v-select>
        </div>
        <div class="bottomm">
          <button class="locate-btn">
            <span class="mdi mdi-map-marker-circle"></span>
            حدد موقعك الحالى تلقائيا
          </button>

          <button class="search-btn">
            <span class="mdi mdi-map-search-outline"></span>
            بحث
          </button>
        </div>
      </form>
      <!-- end search bar -->

      <!-- functions -->
      <ul class="functions">

        <li>
          <a href="#!">
            <img src="../assets/img/fn1.png" alt="">
            <p>
              الأماكن القريبة
            </p>
          </a>
        </li>

        <li>
          <a href="#!">
            <img src="../assets/img/fn2.png" alt="">
            <p>
              عرض الخريطة
            </p>
          </a>
        </li>

        <li>
          <a href="#!">
            <img src="../assets/img/fn3.png" alt="">
            <p>
              إدارة الحجز
            </p>
          </a>
        </li>

        <li>
          <a href="#!">
            <img src="../assets/img/fn4.png" alt="">
            <p>
              شراء عضوية
            </p>
          </a>
        </li>

      </ul>
      <!-- end functions -->

    </header>
  </div>

</template>

<script>
export default {
  name: 'LandingPage',
  data () {
    return{
      options: [
        'القاهرة',
        'الإسكندرية',
        'الفيوم'
      ]
    }
  }
}
</script>

<style lang="sass">
  @import '../assets/sass/mixins'
  /*landing header*/
  .landing-header
    background: url('../assets/img/bg-l.jpg') -30px 0 no-repeat
    background-size: contain
    padding-top: 50px

    .landing-logo
      height: 100px
      margin-right: 100px
      display: block

    .info
      margin-top: 50px
      margin-right: 100px
      width: 600px

      .p1
        color: gray
        font-size: 30px

      .p2
        color: $text
        font-size: 50px
        font-weight: bolder
        margin-top: 20px


    .search-bar
      width: 100%
      margin: 50px auto

      .topp
        display: flex
        justify-content: center

        label
          height: 70px
          background: $color
          color: white
          width: 70px
          display: inline-flex
          align-items: center
          justify-content: center
          font-size: 30px
          line-height: 1
          margin-left: -70px
          border-radius: 35px
          position: relative
          z-index: 2
          cursor: pointer

          &:hover
            background: lighten($color, 20)


        #searchBar
          height: 70px
          background: white
          border: none
          border-radius: 35px
          box-shadow: 0 0 30px rgba(0, 0, 0, 0.2)
          padding: 10px
          padding-right: 90px
          width: 550px
          font-size: 16px
          position: relative
          z-index: 1

          &:focus
            box-shadow: 0 0 30px rgba(0, 0, 0, 0.3)


        .v-select
          margin-right: 50px
          height: 70px
          background: white
          border: none
          border-radius: 35px
          box-shadow: 0 0 30px rgba(0, 0, 0, 0.2)
          width: 200px
          padding: 0 20px
          color: $color

        .vs__dropdown-toggle
          border: none
          height: 100px

        .vs__search, .vs__search:focus, .vs__actions, .vs--single .vs__selected
          margin-top: -20px


      .bottomm
        display: flex
        justify-content: center
        margin-top: 30px

        .locate-btn
          border: none
          background: transparent
          font-size: 14px
          color: $gray_text
          cursor: pointer
          display: flex
          justify-content: center
          align-items: center
          &:hover
            color: darken($gray_text, 10)

          span
            font-size: 25px
            margin-left: 10px

        .search-btn
          border: none
          background: $color
          padding: 20px 30px
          margin-right: 100px
          border-radius: 35px
          font-size: 16px
          color: white
          cursor: pointer
          display: flex
          justify-content: center
          align-items: center
          box-shadow: 0 0 30px rgba(0, 0, 0, 0.2)
          transition: 0.2s ease-in-out all

          &:hover
            transform: scaleX(1.1) scaleY(0.95)
            box-shadow: 0 0 30px rgba(0, 0, 0, 0.5)


          span
            font-size: 25px
            margin-left: 10px


    .functions
      margin-bottom: 20px
      width: 100%
      display: flex
      align-items: center
      justify-content: center
      list-style-type: none
      flex-wrap: wrap

      li
        height: 250px
        width: 230px
        position: relative
        box-shadow: 0 0 30px rgba(0, 0, 0, 0.2)
        margin: 25px
        overflow: hidden
        border-radius: 10px
        transition: 0.3s ease-in-out all

        &:hover
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.3)

        a
          position: absolute
          display: block
          height: 100%
          width: 100%
          top: 0
          left: 0
          text-decoration: none
          color: $text

          img
            width: 100%
            height: 200px

          p
            font-size: 16px
            font-weight: bold
            text-align: center
            height: 50px
            width: 100%
            display: flex
            align-items: center
            justify-content: center
            background: white
            margin-top: -5px

</style>
