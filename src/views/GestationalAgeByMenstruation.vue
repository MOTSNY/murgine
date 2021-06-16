<template>
  <v-card
    class="calculator-page"
  >
    <calculator-title
      title-text="Срок беременности по дню последних месячных"
    ></calculator-title>
    <v-divider/>
    <v-card-actions>
      <v-container fluid>
        <v-row
          dense
        >
          <v-col
            cols="12"
          >
            <v-dialog
              ref="dialog"
              v-model="dialog"
              :return-value.sync="lastMenstruation"
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="computedDateFormatted"
                  label="День последних месячных"
                  prepend-inner-icon="mdi-calendar"
                  readonly
                  clearable
                  v-bind="attrs"
                  v-on="on"
                  outlined
                ></v-text-field>
              </template>
              <v-date-picker
                ref="picker"
                color="primary"
                show-adjacent-months
                v-model="lastMenstruation"
                :max="new Date(Date.now() + 3*366*24*60*60*1000).toISOString().substr(0, 10)"
                :min="new Date(Date.now() - 3*366*24*60*60*1000).toISOString().substr(0, 10)"
                locale="ru-ru"
                @change="checkAnswer"
              ></v-date-picker>
            </v-dialog>
          </v-col>
          <v-col
            cols="12"
          >
            <v-btn
              :disabled="disableAnswer"
              block
              x-large
              class="btn-answer"
              color="primary"
              @click="changeViewAnswer"
            >
              {{answer}}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card-actions>
  </v-card>
</template>

<script>
import CalculatorTitle from '../components/calculatorTitle'
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'GestationalAge',
  components: { CalculatorTitle },

  data: () => ({
    dialog: false,
    answer: '',
    disableAnswer: true
  }),

  validations: {
    lastMenstruation: {
      required
    }
  },

  mounted () {
    this.answer = this.$store.getters.getViewAnswer ? 'Д:0' : 'Н:0 Д:0'
    if (this.lastMenstruation !== null) {
      this.checkAnswer()
    }
  },

  computed: {

    lastMenstruation: {
      get: function () {
        return this.$store.getters.getLastMenstruation
      },
      set: function (value) {
        this.$store.commit('lastMenstruation', value)
      }
    },

    nullViewAnswer () {
      return this.$store.getters.getViewAnswer ? 'Д:0' : 'Н:0 Д:0'
    },

    computedDateFormatted: {
      get: function () {
        return this.formatDate(this.lastMenstruation)
      },
      set: function (value) {
        this.lastMenstruation = value
        this.disableAnswer = true
        this.answer = this.nullViewAnswer
      }
    }
  },

  watch: {
    dialog (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },

  methods: {
    checkAnswer () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.$refs.dialog.save(this.lastMenstruation)
        this.viewAnswer()
      } else {
        this.disableAnswer = true
        this.answer = this.nullViewAnswer
      }
    },

    viewAnswer () {
      this.disableAnswer = false
      const answer = Math.ceil((Date.now() - Date.parse(this.lastMenstruation)) / (1000 * 60 * 60 * 24))
      if (this.$store.getters.getViewAnswer) {
        this.answer = 'Д:' + answer
      } else {
        this.answer = 'Н:' + Math.floor(answer / 7) + ' Д:' + Math.ceil(answer - Math.floor(answer / 7) * 7)
      }
    },

    changeViewAnswer () {
      this.$store.commit('viewAnswer', !this.$store.getters.getViewAnswer)
      this.checkAnswer()
    },

    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}.${month}.${year}`
    }
  }
}
</script>

<style scoped>

</style>
