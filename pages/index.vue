<template>
  <row center>
    <column medium="two-third">
      <section class="view basic">
        <div class="password" v-if="password">
          {{password}}
        </div>
      </section>
      <section class="settings basic">
        <row center>
          <column class="settings__column">
            <fieldset>
              <legend>length</legend>
              <input type="range" min="1" max="100" v-model="settings.length">
              <hr  />
              {{settings.length}}
            </fieldset>
            <fieldset>
              <legend>capitals</legend>
              <input type="range" min="1" max="100" v-model="settings.capitals">
              <hr  />
              {{settings.capitals}}% = {{Math.round((settings.length / 100) * settings.capitals)}}
            </fieldset>
            <fieldset>
              <legend>letters</legend>
              <input type="checkbox" id="settings_letters" v-model="settings.letters">
              <label for="settings_letters"></label>
              <input type="range" min="0" max="100" v-if="settings.letters" v-model="settings.letters_total">
              <hr  />
              {{settings.letters}} {{settings.letters_total}}%
            </fieldset>
            <fieldset>
              <legend>numbers</legend>
              <input type="checkbox" id="settings_numbers" v-model="settings.numbers">
              <label for="settings_numbers"></label>
              <input type="range" min="0" max="100" v-if="settings.numbers" v-model="settings.numbers_total">
              <hr  />
              {{settings.numbers}}{{settings.numbers_total}}%
            </fieldset>

            <fieldset>
              <legend>special characters</legend>
              <input type="checkbox" id="settings_special" v-model="settings.special">
              <label for="settings_special"></label>
              <hr  />
              {{settings.special}}
            </fieldset>
          </column>
        </row>
      </section>
    </column>
  </row>
</template>

<script>
  export default{
    data(){
      return{
        password: '',
        settings: {
          letters: true,
          letters_total: 100,
          numbers: true,
          numbers_total: 0,
          special: false,
          length: 8,
          capitals: 0,
        }
      }
    },
    methods: {
      generatePassword(){
        let password = '';
        let i=0;
        while (i < 10) {
          password += "The number is " + i;
          i++;
        }
        return password;
      }
    },
    mounted(){
      this.generatePassword();
    },
    watch:{
      'settings.numbers_total': function (newVal, oldVal){
        this.settings.letters_total = (100 - newVal);
      },
      'settings.letters_total': function (newVal, oldVal){
        this.settings.numbers_total = (100 - newVal);
      },
      'settings.letters': function (newVal, oldVal){
        if(!newVal){
          this.settings.numbers_total = 100;
          this.settings.numbers = true;
        }
      },
      'settings.numbers': function (newVal, oldVal){
        if(!newVal){
          this.settings.letter_total = 100;
          this.settings.letters = true;
        }
      },
    }
  }
</script>


<style lang="scss">
@import "~svd-style/ext";

.password {
  border: 2px solid color(Offwhite);
  font-size: grid(1);
  padding: 1em;
}
.settings{
  &__column{
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
  }
}

fieldset{
  border: 2px solid color(Offwhite);
  padding: 1rem;
  margin: 1rem; 
  // & + fieldset{
  //   margin-top: 1rem;
  // }
  legend{ padding: 1rem; }
}
.error {
  background-color: color(Red, 0.2);
  border: 1px solid color(Red, 0.5);
  padding: 1em;
  border-radius: 3px;
  font-size: 12px;
  display: inline-block;
  opacity: 1;
  transition: opacity 0.1s;
  position: absolute;
  &.hide {
    opacity: 0;
  }
}
</style>
