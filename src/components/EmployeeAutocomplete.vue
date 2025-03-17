<template>
    <div style="padding-bottom: 15px;">
      <h1>Hello World</h1>
        <!--@vue-ignore-->
        <v-autocomplete v-model="employeeSelect"
                        :search="search"
                        :loading="isLoading"
                        :items="employees"
                        hide-no-data
                        return-object
                        item-value="employeeId"
                        item-title="displayName"
                        :label="title"
                        @update:search="asyncSearch"
                        @update:modelValue="setEmployee"
                        variant="outlined"
                        density="compact"
                        persistent-hint
                        hint="3 character minimum"
                        :menu="menu"
                        prepend-inner-icon="fas fa-search"
                        clearable
                        @click:clear="clearAutocompleteList"
                        :disabled="disabled"
                        :rules="rules"
                        aria-label="Search for an employee">
            <template v-slot:item="{ props }">
                <v-list-item v-bind="{...props}"></v-list-item>
            </template>
        </v-autocomplete>
    </div>
</template>

<script lang="ts">

    import { defineComponent } from 'vue';
    import { EmployeeModel } from '@kcat/user-wizard-models/src/employeeModel';
    import { useDataAccess } from '@/composables/useDataAccess';

    export default defineComponent({
        name: 'EmployeeAutocomplete',
        data()
        {
            return {
                employees: [] as EmployeeModel[],
                awaitingSearch: false,
                menu: false,
                isLoading: false,
                employeeSelect: '',
                search: '',
                searchTimeout: null,
                title: '',
                validSearch: '',
            };
        },
        mounted: function ()
        {
            this.title = useDataAccess();
        },
    });
</script>

<style scoped>
    #title {
        background-color: #FAFBFC;
        font-weight: bold;
    }
</style>
