import './JobFilter.css';
import ProfileCard from '../ProfileCard/ProfileCard';

const JobsFilter = (props)=> {

    const renderEmployment = ()=> (
        <div className='emp-container'>
            <h1 className='emp-type-heading'>Type of Employment</h1>
            <div className='emp-types-list'>
                {getEmploymentTypes()}
            </div>
        </div>
    );
    const getEmploymentTypes = ()=> {
        const {EmpTypeList} = props;

        return EmpTypeList.map((emp)=> {
            const {ChangeEmpType,getJobs} = props;
            const onChangeEmp = (event)=> {
                ChangeEmpType(event.target.value)
            }

            return(
                <div key={emp.employmentTypeId} onChange={onChangeEmp} className='checkbox-list'>
                    <input type='checkbox'
                        className='input-checkbox'
                        id={emp.employmentTypeId}
                        value={emp.employmentTypeId}>
                              
                    </input>
                    <label htmlFor={emp.employmentTypeId} className='checkbox-label'>
                        {emp.label}
                    </label>
                </div>
            )
        })
    };

    const renderSalary = ()=> (
        <div className='salary-container'>
            <h1 className='emp-type-heading'>Salary Range</h1>
            <div className='emp-types-list'>
                {getSalaryRange()}
            </div>
        </div>
    );
    const getSalaryRange = ()=> {
        const {SalRangeList} = props;
        
        return SalRangeList.map((salary)=> {
            const {ChangeSal,getJobs} = props

            const onChangeSalary = (event)=> {
                ChangeSal(event.target.value)
            }

            return(
                <div className='checkbox-list' key={salary.salaryRangeId} onChange={onChangeSalary}>
                    <input className='input-checkbox'
                        type='radio'
                        id={salary.salaryRangeId}
                        value={salary.salaryRangeId}
                        name='salary'>
                    </input>
                    <label className='checkbox-label' htmlFor={salary.salaryRangeId}>
                        {salary.label}
                    </label>
                </div>
            )
        })
    };

    
    return(
        <div className='job-filter-group'>
            <ProfileCard/>
            <div className='job-filters'>
                <hr className='hr-line'></hr>
                <div>
                    {renderEmployment()}
                </div>
                <hr className='hr-line'></hr>
                <div>
                {renderSalary()}
                </div>
            </div>
        </div>
    )
};

export default JobsFilter;