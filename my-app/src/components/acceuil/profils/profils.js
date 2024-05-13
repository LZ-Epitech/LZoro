import '../css/profils.css'

function ProfilMinComponent(s)
{
    const props = s.persons;
    console.log(s);

    return(
        <div className="profilmin">
            <p className="profilmin__name">{props.name}</p>
            <div className="profilmin__elo">
                <p className="profilmin__1v1">1v1 : {props.elo1v1}</p>
                <p className="profilmin__2v2">2v2 : {props.elo2v2}</p>
            </div>
            <img src={props.backgroundImage} className="profilmin__backgroundimage" alt="backgroundimage" />
        </div>
    );
}

function ProfilHead(s)
{
    const props = s.persons;
    const place = props.place ? `${props.place}` : '';

    return(
        <div className={`profilhead ${place}`}>
            <img src={props.fields.backgroundImage} className="profilhead__backgroundimage"  alt="backgroundimage"/>
        </div>
    )
}

export {ProfilMinComponent, ProfilHead};