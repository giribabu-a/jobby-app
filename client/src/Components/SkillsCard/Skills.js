import './Skills.css'

const SkillsCard = (props)=> {

    const {SkillsDetails} = props;
    const {name, imageUrl} = SkillsDetails;

    return(
        <div className='skills-list'>
            <div className='skill-logo-container'>
                <img src={imageUrl} alt='skills logo' className='skill-logo'></img>
            </div>
            <div className='skill-text'>{name}</div>
        </div>
    )
};

export default SkillsCard;