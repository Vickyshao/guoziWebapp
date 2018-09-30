<template>
  <div class="view-special">
    <gz-header class="specail-requirement-header"></gz-header>
    <special-requirement class="margin88" :special-demand="specailRequirement"></special-requirement>
  </div>
</template>

<script>
import {
    mapGetters,
} from 'vuex';
import SpecialRequirement from '../../components/biz/special-requirement';

export default {
    computed: {
        ...mapGetters([
            'specailRequirement',
        ]),
    },
    components: {
        [SpecialRequirement.name]: SpecialRequirement,
    },
};
</script>

<style lang="less">
    .view-special{
        .margin88{
            padding-top: 88px !important;
        }
    }
</style>
