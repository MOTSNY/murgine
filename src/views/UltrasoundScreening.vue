<!-- @author Mitskevich Yauheni -->
<template>
  <v-card
    class="calculator-page"
  >
    <calculator-title
      title-text="Даты визитов на УЗИ скрининг"
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
                :max="new Date(Date.now() + 4*366*24*60*60*1000).toISOString().substr(0, 10)"
                :min="new Date(Date.now() - 4*366*24*60*60*1000).toISOString().substr(0, 10)"
                locale="ru-ru"
                @change="checkAnswer"
              ></v-date-picker>
            </v-dialog>
            <v-divider/>
          </v-col>
          <v-col
            cols="12"
            style="max-height: calc(100vh - 232px); overflow: auto; padding-bottom: 20px;"
          >
            <v-expansion-panels>
              <v-expansion-panel
                v-for="answer in answers"
                :key="answer.week"
              >
                <v-expansion-panel-header
                  color="primary--text"
                >
                  {{answer.week}} неделя
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-btn
                    block
                    x-large
                    class="btn-answer"
                    color="primary"
                  >
                    {{answer.date}}
                  </v-btn>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
      </v-container>
    </v-card-actions>
  </v-card>
</template>

<script>
import CalculatorTitle from '../components/calculatorTitle'
export default {
  name: 'UltrasoundScreening',
  components: { CalculatorTitle },
  data: () => ({
    dialog: false,
    weeksVisits: [
      { from: 11, to: 13 },
      { from: 18, to: 21 },
      { from: 32, to: 35 }
    ],
    answers: []
  }),

  mounted () {
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

    computedDateFormatted: {
      get: function () {
        return this.formatDate(this.lastMenstruation)
      },
      set: function (value) {
        this.lastMenstruation = value
        this.answers = []
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
      this.$refs.dialog.save(this.lastMenstruation)
      this.answers = []
      const dateLastMenstruation = new Date(this.lastMenstruation)
      const millisecondsDay = 24 * 60 * 60 * 1000
      this.weeksVisits.forEach(weekVisit => {
        const isActualDate = (Date.parse(this.lastMenstruation) + (weekVisit.to * 7 + 7 - dateLastMenstruation.getDay()) * millisecondsDay) - Date.now()
        if (isActualDate > 0) {
          const dateVisit = new Date(Date.now() + isActualDate)
          this.answers.push({ week: weekVisit.from + ' - ' + weekVisit.to, date: this.formatDate(new Date(dateVisit - ((weekVisit.to - weekVisit.from) * 7 + 6) * millisecondsDay).toISOString().substr(0, 10)) + ' - ' + this.formatDate(new Date(dateVisit - 2 * millisecondsDay).toISOString().substr(0, 10)) })
        }
      })
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

.btn-answer{
  font-size: 1.3rem!important;
  height: 50px!important;
  max-width: 100%;
}

</style>
