<template>

  <form class="card card-w30" @submit.prevent="createBlock">
    <div class="form-control">
      <label for="type">Тип блока</label>
      <select id="type" name="type" v-model="type">
        <option value="title">Заголовок</option>
        <option value="subtitle">Подзаголовок</option>
        <option value="avatar">Аватар</option>
        <option value="text">Текст</option>
      </select>
      <small v-if="errors.type">{{ errors.type }}</small>
    </div>

    <div class="form-control">
      <label for="value">Значение</label>
      <textarea id="value" rows="3" name="content" v-model="content"></textarea>
      <small v-if="errors.content">{{ errors.content }}</small>
    </div>

    <button class="btn primary" type="submit"  :disabled="!isValid">Добавить</button>
  </form>

</template>

<script>

export default {
  data () {
    return {
      id: 0,
      type: '',
      content: '',
      errors: this.defaultErrors()
    }
  },
  computed: {
    isValid () {
      return this.formIsValid()
    }
  },
  methods: {
    defaultErrors () {
      return {
        type: null,
        content: null
      }
    },
    formIsValid () {
      let isValid = true

      this.errors = this.defaultErrors()

      const successTypes = ['title', 'subtitle', 'avatar', 'text']

      if (!successTypes.includes(this.type)) {
        isValid = false
        this.errors.type = 'Выберите тип блока'
      }

      if (this.content.length < 3) {
        isValid = false
        this.errors.content = 'Заполните значение блока'
      }

      return isValid
    },
    createBlock (event) {
      if (this.formIsValid()) {
        this.$emit('block-created', {
          id: this.type,
          type: this.type,
          content: this.content
        })

        this.id++
        this.type = ''
        this.content = ''
      }
    }
  }
}

</script>
