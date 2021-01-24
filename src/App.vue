<template>

  <div class="container column">

    <resume-form @block-created="addResumeBlock"></resume-form>

    <div class="card card-w70" >

      <div v-if="resume.length === 0"><h3>Добавьте первый блок, чтобы увидеть результат</h3></div>

      <component v-else v-for="block in resume" :is="'resume-'+block.type" :value="block.content" v-bind:key="block.id"></component>

    </div>

  </div>

  <div class="container">

    <p v-if="this.comments.length === 0">
      <button class="btn primary" @click="loadComments">Загрузить комментарии</button>
    </p>

    <div class="card" v-if="this.comments.length">
      <h2>Комментарии</h2>
      <ul class="list">
        <li class="list-item" v-for="comment in comments" v-bind:key="comment.id">
          <div>
            <p><strong>{{ comment.email }}</strong></p>
            <small>{{ comment.body }}</small>
          </div>
        </li>
      </ul>
    </div>
    <div class="loader" v-show="isLoading"></div>

  </div>

</template>

<script>

import axios from 'axios'

export default {
  data () {
    return {
      resume: [],
      comments: [],
      isLoading: false
    }
  },
  methods: {

    addResumeBlock (data) {
      this.resume.push(data)
    },
    async loadComments () {
      this.isLoading = true

      const { data } = await axios.get('https://jsonplaceholder.typicode.com/comments?_limit=42')

      this.comments = data

      this.isLoading = false
    }
  },
  components: {
    'resume-title': {
      props: ['value'],
      template: '<h1>{{ value }}</h1>'
    },
    'resume-subtitle': {
      props: ['value'],
      template: '<h2>{{ value }}</h2>'
    },
    'resume-avatar': {
      props: ['value'],
      template: '<div class="avatar"><img :src="value"></div>'
    },
    'resume-text': {
      props: ['value'],
      template: '<p>{{ value }}</p>'
    }
  }
}

</script>

<style>
  .avatar {
    display: flex;
    justify-content: center;
  }

  .avatar img {
    width: 150px;
    height: auto;
    border-radius: 50%;
  }
</style>
