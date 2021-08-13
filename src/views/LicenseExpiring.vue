<!-- @author Mitskevich Yauheni -->
<template>
  <div>
    <v-snackbar
      v-model="snackbar"
      timeout="2000"
      color="primary"
      elevation="24"
    >
      EMAIL скопирован в буфер обмена
    </v-snackbar>
    <v-card
      class="calculator-page"
    >
      <v-card-text>
        <v-row dense align="center">
          <v-col class="text-h6 font-weight-medium text--primary">
            Пробный период окончен
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider/>
      <v-card-actions>
        <v-container fluid>
          <v-row
            dense
          >
            <v-col
              cols="12"
            >
              Спасибо, что воспользовались нашим продуктом.
            </v-col>
          </v-row>
          <v-row
            dense
          >
            <v-col
              cols="12"
            >
              Пишите нам на почту если есть предложения, идеи либо то, что вас не устроило. Будем рады любому отзыву.
            </v-col>
          </v-row>
          <v-row
            dense
          >
            <v-col
              cols="12"
            >
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    block
                    x-large
                    class="btn-answer"
                    color="primary"
                    @click="copyEmail"
                    v-bind="attrs"
                    v-on="on"
                  >
                    murgine.calc@gmail.com
                  </v-btn>
                </template>
                <span>Нажмите кнопку, чтобы скопировать EMAIL в буфер обмена</span>
              </v-tooltip>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
    <div class="copyright">
      Copyright © 2020-2021 «Murgine» Mitskevich Yauheni
    </div>
  </div>
</template>

<script>
export default {
  name: 'LicenseExpiring',
  data: () => ({
    snackbar: false
  }),
  methods: {
    copyEmail () {
      navigator.clipboard.writeText('murgine.calc@gmail.com')
      this.snackbar = true
    }
  }
}
</script>

<style lang="scss" scoped>

.btn-answer{
  font-size: 1.3rem!important;
  height: 50px!important;
  max-width: 100%;
}

.copyright{
  position: fixed;
  bottom: 0;
  z-index: 100;
  margin-left: 5px;
  font-size: 10px;
}

</style>
