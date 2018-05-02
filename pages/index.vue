<template>
  <row center>
    <column medium="two-third">
      <section class="view basic">
        <div class="password" v-if="password">
          {{password}}
        </div>
      </section>
      <section class="settings basic">
        <row center medium="1:3">
          <column class="settings__column">
            <fieldset>
              <legend>length</legend>
              <input type="range" min="1" max="256" v-model="settings.length">
              {{settings.length}} characters
            </fieldset>
          </column>
          <column class="settings__column">
            <fieldset>
              <legend>capitals</legend>
              <input type="range" min="0" max="100" v-model="settings.capitals">
              {{settings.capitals}}% = {{Math.round((settings.length / 100) * settings.capitals)}}
            </fieldset>
          </column>
          <column class="settings__column">

            <fieldset>
              <legend>special characters</legend>
              <input type="checkbox" id="settings_special" v-model="settings.special">
              <label for="settings_special"></label>
              {{settings.special}}
            </fieldset>
          </column>
          <column class="settings__column">
            <fieldset>
              <legend>letters</legend>
              <input type="checkbox" id="settings_letters" v-model="settings.letters">
              <label for="settings_letters"></label>
              <input type="range" min="0" max="100" v-if="settings.letters" v-model="settings.letters_total">
              {{settings.letters}} {{settings.letters_total}}%
            </fieldset>
          </column>
          <column class="settings__column">
            <fieldset>
              <legend>numbers</legend>
              <input type="checkbox" id="settings_numbers" v-model="settings.numbers">
              <label for="settings_numbers"></label>
              <input type="range" min="0" max="100" v-if="settings.numbers" v-model="settings.numbers_total">
              {{settings.numbers}}{{settings.numbers_total}}%
            </fieldset>
          </column>
          <column class="settings__column">
            <fieldset>
              <legend>numbers</legend>
              <input type="checkbox" id="settings_numbers" v-model="settings.special">
              <label for="settings_numbers"></label>
              <input type="range" min="0" max="100" v-if="settings.special" v-model="settings.special_total">
              {{settings.special}}{{settings.special_total}}%
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
      generatePassword: function(){
        let password = 'henk';
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
    // display: flex;
    // flex-wrap: wrap;
    // align-items: flex-start;
    // justify-content: flex-start;
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




/// INPUT range


input[type="range"] {
  -webkit-appearance: none;
  margin: 18px 0;
  width: 100%;
  border: none !important; box-shadow: none; outline: none;
}
input[type="range"]:focus {
  outline: none;
}
input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 8px;
  cursor: pointer;
  animate: 0.2s;
  background: color(Black,.1);
  border-radius: 5px;
}
input[type="range"]::-webkit-slider-thumb {
  border: 1px solid color(Dark,.25);
  height: 1rem;
  width: 1rem;
  border-radius: 50%;
  background: #ffffff;
  // box-shadow: 0 0 .5rem 0 color(Dark,.25);
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -4px;
}
input[type="range"]:focus::-webkit-slider-runnable-track {
  background: color(Dark,.5);
}
input[type="range"]::-moz-range-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  animate: 0.2s;
  // box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  background: #3071a9;
  border-radius: 1.3px;
  border: 0.2px solid #010101;
}
input[type="range"]::-moz-range-thumb {
  // box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  border: 1px solid #000000;
  height: 36px;
  width: 16px;
  border-radius: 3px;
  background: #ffffff;
  cursor: pointer;
}
input[type="range"]::-ms-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  animate: 0.2s;
  background: transparent;
  border-color: transparent;
  border-width: 16px 0;
  color: transparent;
}
input[type="range"]::-ms-fill-lower {
  background: #2a6495;
  border: 0.2px solid #010101;
  border-radius: 2.6px;
  // box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
}
input[type="range"]::-ms-fill-upper {
  background: #3071a9;
  border: 0.2px solid #010101;
  border-radius: 2.6px;
  // box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
}
input[type="range"]::-ms-thumb {
  // box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  border: 1px solid #000000;
  height: 36px;
  width: 16px;
  border-radius: 3px;
  background: #ffffff;
  cursor: pointer;
}
input[type="range"]:focus::-ms-fill-lower {
  background: #3071a9;
}
input[type="range"]:focus::-ms-fill-upper {
  background: #367ebd;
}

</style>
