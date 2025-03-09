<template>
    <div style="padding-bottom: 15px;">
        <!--@vue-ignore-->
        <v-autocomplete
            v-model="values"
            :items="items"
            label="Default"
          ></v-autocomplete>
    </div>
</template>

<script lang="ts">

    import { defineComponent } from 'vue';
    import { VAutocomplete } from 'vuetify/components';
    import { useDataAccess } from '@/composables/useDataAccess';
import { onMounted } from 'vue';

    export default defineComponent({
        name: 'EmployeeAutocomplete',
        data()
        {
            return {
                items: [],
                values: 'Alaska'
            };
        },
        mounted: function ()
        {
            this.items = useDataAccess();
        },
    });
</script>
