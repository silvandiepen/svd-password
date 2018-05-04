<template>
  <row center>
    <column medium="two-third">
      <section class="view basic">
        <div class="password" v-if="password">   
          {{password}}
          <div :class="['overlay', isCopied ? 'copied' : '']" @mouseleave="onCopyLeave">
            <button class="button--rounded" v-on:click="generatePassword">&#8635; Refresh</button>
            <button class="button--rounded" v-clipboard:copy="password" v-clipboard:success="onCopy">&#x1f4cb; Copy to clipboard</button>
            <h3 v-if="isCopied">Woohoo, copied!</h3>
          </div>
        </div>
      </section>
      <section class="settings basic">
        <row center medium="1:3">
          <column medium="half">
            <fieldset>
              <label>length</label>
              <span class="range">
                <span class="range__amount">{{settings.totalChars}}</span>
                <input class="range__slider" type="range" min="0" max="256" v-model="settings.totalChars">
              </span>
            </fieldset>
            <fieldset>
              <label>letters</label>
              <div class="input-switch">
                <input type="checkbox" id="settings_letters" v-model="settings.letters">
                <label for="settings_letters"></label>
              </div>

              <br />

              <label>numbers</label>
              <div class="input-switch">
                <input type="checkbox" id="settings_numbers" v-model="settings.numbers">
                <label for="settings_numbers"></label>
              </div>
              <br />

              <label>special characters</label>
              <div class="input-switch">
                <input type="checkbox" id="settings_special" v-model="settings.special">
                <label for="settings_special"></label>
              </div>
              <br />
            </fieldset>
          </column>
          <column medium="half" style="opacity: .25;">

            <fieldset>
              <div v-if="settings.letters">
                <label>letters</label>
                <span class="range">
                  <span class="range__amount">{{settings.letters_total}}%</span>
                  <input class="range__slider" type="range" min="0" max="100" v-if="settings.letters" v-model="settings.letters_total">
                </span>
              </div>

              <div v-if="settings.numbers">
                <label>numbers</label>
                <span class="range">
                  <span class="range__amount">{{settings.numbers_total}}%</span>
                  <input class="range__slider" type="range" min="0" max="100" v-if="settings.numbers" v-model="settings.numbers_total">
                </span>
              </div>

              <div v-if="settings.special">
                <label>special characters</label>
                <span class="range">
                  <span class="range__amount">{{settings.special_total}}%</span>
                  <input class="range__slider" type="range" min="0" max="100" v-if="settings.special" v-model="settings.special_total">
                </span>
              </div>

              <div>
                <label>capitals</label>
                <span class="range">
                  <span class="range__amount">{{settings.capitals}}</span>
                  <input class="range__slider" type="range" min="0" max="100" v-model="settings.capitals">
                </span>
              </div>
            </fieldset>
          </column>
        </row>
      </section>
    </column>
  </row>
</template>

<script>
export default {
  data() {
    return {
      isCopied: false,
      password: "",
      settings: {
        letters: true,
        letters_total: 100,
        numbers: false,
        numbers_total: 0,
        special: false,
        totalChars: 8,
        capitals: 0
      },
      characters: {
        letters: [
          "a",
          "b",
          "c",
          "d",
          "e",
          "f",
          "g",
          "h",
          "i",
          "j",
          "k",
          "l",
          "m",
          "n",
          "o",
          "p",
          "v",
          "q",
          "v",
          "r",
          "s",
          "t",
          "u",
          "v",
          "v",
          "w",
          "v",
          "x",
          "y",
          "z"
        ],
        vowel: ["a", "e", "i", "o", "u", "y"],
        numbers: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
        special: [
          "!",
          "@",
          "#",
          "$",
          "%",
          "ˆ",
          "&",
          "*",
          "(",
          ")",
          "?",
          ">",
          "<"
        ]
      }
    };
  },
  methods: {
    onCopy: function(e){
      this.isCopied = true; 
    },
    onCopyLeave: function(e){
      this.isCopied = false; 
    },
    randomNumber: function getRandomInt(max) {
      let min = 0;
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    },
    generatePassword: function(_this) {
      let password = "";
      let i = 0;
      while (i < _this.settings.totalChars) {
        let char = "";

        // If only letters
        if (
          _this.settings.letters &&
          !_this.settings.numbers &&
          !_this.settings.special
        ) {
          password +=
            _this.characters.letters[
              _this.randomNumber(_this.characters.letters.length)
            ];
        }
        // If only numbers
        if (
          !_this.settings.letters &&
          _this.settings.numbers &&
          !_this.settings.special
        ) {
          password += _this.randomNumber(9);
        }
        // If letters & numbers
        if (
          _this.settings.letters &&
          _this.settings.numbers &&
          !_this.settings.special
        ) {
          let chooseChar = _this.randomNumber(2);
          console.log(chooseChar);
          if (chooseChar === 1) {
            password +=
              _this.characters.letters[
                _this.randomNumber(_this.characters.letters.length)
              ];
          } else {
            password += _this.randomNumber(10);
          }
        }
        // If letters & special
        if (
          _this.settings.letters &&
          !_this.settings.numbers &&
          _this.settings.special
        ) {
          let chooseChar = _this.randomNumber(2);
          console.log(chooseChar);
          if (chooseChar === 1) {
            password +=
              _this.characters.special[
                _this.randomNumber(_this.characters.special.length)
              ];
          } else {
            password +=
              _this.characters.letters[
                _this.randomNumber(_this.characters.letters.length)
              ];
          }
        }
        // If numbers & special
        if (
          !_this.settings.letters &&
          _this.settings.numbers &&
          _this.settings.special
        ) {
          let chooseChar = _this.randomNumber(2);
          console.log(chooseChar);
          if (chooseChar === 1) {
            password +=
              _this.characters.special[
                _this.randomNumber(_this.characters.special.length)
              ];
          } else {
            password += _this.randomNumber(10);
          }
        }
        // If letters & numbers & special chars
        if (
          _this.settings.letters &&
          _this.settings.numbers &&
          _this.settings.special
        ) {
          let chooseChar = _this.randomNumber(3);
          console.log(chooseChar);
          if (chooseChar === 1) {
            password +=
              _this.characters.letters[
                _this.randomNumber(_this.characters.letters.length)
              ];
          } else if (chooseChar === 2) {
            password +=
              _this.characters.special[
                _this.randomNumber(_this.characters.special.length)
              ];
          } else {
            password += _this.randomNumber(10);
          }
        }
        i++;
      }
      return password;
    }
  },
  mounted() {
    let _this = this;
    _this.password = _this.generatePassword(_this);
  },
  watch: {
    settings: {
      handler: function(after, before) {
        let _this = this;
        _this.password = _this.generatePassword(_this);
        console.log("hoi");
      },
      deep: true
    },
    "settings.numbers_total": function(newVal, oldVal) {
      this.settings.letters_total = 100 - newVal;
    },
    "settings.letters_total": function(newVal, oldVal) {
      this.settings.numbers_total = 100 - newVal;
    },
    "settings.letters": function(newVal, oldVal) {
      if (!newVal) {
        this.settings.numbers_total = 100;
        this.settings.numbers = true;
      }
    },
    "settings.numbers": function(newVal, oldVal) {
      if (!newVal) {
        this.settings.letter_total = 100;
        this.settings.letters = true;
      }
    }
  }
};
</script>


<style lang="scss">
@import "~svd-style/ext";

.password {
  border: 2px solid color(Offwhite);
  font-size: grid(1);
  padding: 1em;
  position: relative;
  overflow: hidden;
  .overlay {
    background-color: color(Black, 0.5);
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transform: translateY(-100%);
    transition: transform 0 0.3s, opacity 0.3s, background-color .3s;
    button {
      transform: translateY(-100vh);
      &:nth-child(1) {
        transition: transform 0.2s 0.2s;
      }
      &:nth-child(2) {
        transition: transform 0.2s 0.4s;
      }
    }
    &.copied{
      background-color: color(Green,.5);
      &,&:hover{
        button{
        transition: transform .2s; 
         transform: translateY(-100vh);
        }
      }
      h3{
        position: absolute; left: 50%; top: 50%; transform: translate(-50%,50vh); width: 100%; text-align: center; color: white; 
        text-shadow: .1rem .1rem .5rem color(Black,.25); 
        animation: comeUp .3s .5s forwards;
        @at-root{
          @keyframes comeUp {
            0%{
              transform: translate(-50%,50vh);
            }            
            100%{
              transform: translate(-50%,-50%);
            }
          }
        }
      }
    }
  }
  &:hover {
    .overlay {
      opacity: 1;
      transition: transform 0s, opacity 1s;
      transform: translateY(0);
      button {
        &:nth-child(1) {
          transition: transform 0.3s 0.3s;
        }
        &:nth-child(2) {
          transition: transform 0.3s 0.6s;
        }
        transform: translateY(0);
      }
    }
  }
}
fieldset {
  border: 2px solid color(Offwhite);
  padding: 1rem;
  margin: 1rem;
  .range {
    display: flex;
    padding: 0.5rem;
    border: 2px solid color(Offwhite);
    &__amount {
      line-height: 2rem;
      height: 2rem;
      width: grid(1);
    }
    &__slider {
      line-height: 2rem;
      height: 2rem;
      width: calc(100% - #{grid(1)});
      margin: 0;
    }
  }
  label + .range {
    margin-top: 1rem;
  }
}
.error {
  background-color: color(Red, 0.2);
  border:     1px solid color(Red, 0.5);
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
