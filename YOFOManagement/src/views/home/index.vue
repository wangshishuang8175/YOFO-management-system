<template>
  <div>
    <section class="data_section">
      <h1>欢迎回来:{{ userinfo.name }}</h1>
      <!-- :gutter="10" 表示间距10
           :span="3"    表示占据24份的3分
      -->
      </section>
     </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from "vuex";

export default defineComponent({
  name: 'home',
  // components: {
  // },
  setup() {
    const { state, getters, dispatch, commit } = useStore()
    const userinfo = computed(() => state.account.userinfo)
    return { userinfo }
  },
})
</script>


<style lang="scss" scoped>
.data_section {
  padding: 10px;

  .row_list {
    margin-bottom: 20px;
  }

  .pay {
    background-color: #18a689;
  }

  .income {
    background-color: #99cc00;
  }

  .hidden_investors {
    background-color: #33cc99;
  }

  .intention_investors {
    background-color: #3b5999;
  }

  .waitpending_investors {
    background-color: #66cc99;
  }

  .pending_investors {
    background-color: #009999;
  }

  .pass_investors {
    background-color: #ff9900;
  }

  .newadd_investors {
    background-color: #0099cc;
  }

  .data_list {
    text-align: center;
    font-size: 14px;
    border-radius: 6px;
    padding: 15px 0;
    color: #fff;

    .list_number {
      font-size: 16px;
      font-weight: bold;
    }

    .number {
      font-size: 16px;
      font-weight: bold;
    }
  }
}
</style>
