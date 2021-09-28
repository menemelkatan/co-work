<template lang="html">
  <div class="login-root">
    <h2 class="login-header">
      تسجيل الدخول
    </h2>

    <!-- login form -->
    <form class="login-form" @submit="signIn">
      <label for="email">
        <i class="far fa-envelope"></i>
        البريد الإلكترونى
      </label>
      <input type="text" id="email" v-model="email" placeholder="مثال: doc@doc.com">
      <label for="pass">
        <i class="fas fa-unlock-alt"></i>
        كلمة المرور
      </label>
      <input type="password" id="pass" v-model="password">
      <button type="submit">دخول</button>

      <a href="#!">نسيت كلمة المرور؟</a>
    </form>
    <!-- end login form -->
  </div>
</template>

<script>

import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/auth'
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signIn: function(e){
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then((user) => {
        this.$router.replace('Search');
      },
      function(err) {
        alert('failed' + err.message);
      }
    )
      e.preventDefault()

      // var user = firebase.auth().currentUser;
      // if (user) {
      //   this.$router.push({path: '/welcome'})
      // } else {
      //   alert('please login first')
      // }
    }
  }
}
</script>

<style lang="sass">
  @import '../assets/sass/mixins'

  .login-header
    text-align: center
    margin-top: 50px
    color: darken($color, 10)

  /*login form*/
  .login-form
    width: 400px
    background: $color
    margin: 50px auto
    padding: 50px
    box-shadow: 0 0 20px gray
    text-align: right
    padding-bottom: 20px

    input
      width: 100%
      height: 50px
      padding: 5px 10px
      margin-bottom: 20px
      background: darken($color, 5)
      border: none
      color: $gray_text


      &:focus
        background: darken($color, 10)


    label
      margin: 10px 0
      display: block
      color: white
      margin-bottom: 20px
      font-weight: lighter

    button
      background: white
      color: $color
      padding: 10px 40px
      cursor: pointer
      transition: 0.3s ease all
      box-sizing: content-box
      margin: 20px auto
      display: block
      border: 2px solid $gray_text

      &:hover
        background: transparent
        color: $gray_text

      &:active
        transform: scaleX(1.1)


    a
      font-size: 14px
      text-decoration: none
      color: $gray_text
      font-weight: lighter

      &:hover
        color: gray
</style>
