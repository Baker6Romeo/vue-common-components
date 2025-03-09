<template>
    <div style="padding-bottom: 15px;">
        <!--@vue-ignore-->
        <v-autocomplete v-model="employeeSelect"
                        :search="search"
                        :loading="isLoading"
                        :items="employees"
                        hide-no-data
                        return-object
                        item-value="employeeId"
                        item-title="displayName"
                        label="Search for an Employee"
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
    import { VAutocomplete } from 'vuetify/components';
    import { EmployeeModel } from '@kcat/user-wizard-models/src/employeeModel';
    import { useDataAccess } from '@/composables/useDataAccess';

    export default defineComponent({
        name: 'EmployeeAutocomplete',
        props: ['clearSelect', 'employeeId', 'disabled', 'rules', 'showReportUsers', 'refreshResultsOnUpdate'],
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
                validSearch: '',
            };
        },
        mounted: function ()
        {
            if (this.employeeId)
            {
                this.employees = [];
                this.getEmployeeById(this.employeeId);
            }
        },
        watch: {
            employeeId: function ()
            {
                if (this.employeeId)
                {
                    this.getEmployeeById(this.employeeId);
                }
            },
            clearSelect: function ()
            {
                this.employeeSelect = '';
            },
            refreshResultsOnUpdate: function ()
            {
                if (this.refreshResultsOnUpdate)
                {
                    this.searchEmployees(this.search);
                }
            }
        },
        methods: {
            asyncSearch: async function ()
            {
				clearTimeout(this.searchTimeout);
                if (this.search.length >= 3)
                {
                    if (this.search.length > 25)
					{
						this.search = this.search.substring(0, 25);
					}
					this.searchTimeout = setTimeout(async () =>
                    {
                        this.isLoading = true;
                        await this.searchEmployees(this.search);
                        this.awaitingSearch = false;
                    }, 500);
                }
            },
            setEmployee(employee: EmployeeModel)
            {
                if (employee)
                {
                    this.$emit('onSelect', employee);
                }
            },
            async searchEmployees(term: string)
            {
                if (term != "")
                {
                    const response = await useDataAccess().employeeService
                        .searchEmployees(term);

                    if (response.content.length > 0)
                    {
                        this.isLoading = false;
                        this.employees = response.content;
                    }
                    else
                    {
                        this.employees = [];
                        this.$emit('onEmployeeNotFound');
                        this.$emit('onShowError', { showError: true, errorMessage: 'Employee not found. Please search again.' });
                    }
                    this.isLoading = false;
                    this.awaitingSearch = false;
                }
            },
            async getEmployeeById(employeeId: number)
            {
                this.isLoading = true;
                const response = await useDataAccess().employeeService.getById(employeeId);
                this.employees = response.data;
                this.employeeSelect = response.data[0].displayName;
                this.isLoading = false;
            },
            clearAutocompleteList: function ()
            {
                this.employeeSelect = '';
            }
        },
    });
</script>

<style scoped>
    #title {
        background-color: #FAFBFC;
        font-weight: bold;
    }
</style>
