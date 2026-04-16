import { Container, Image, Card, Badge, Row, Col, Form, InputGroup, Button } from "react-bootstrap"
import { useState, useEffect, useContext, useRef } from "react"
import { observer } from "mobx-react-lite"
import { Context } from "../main"
import { getProfile, createProfile, updateSkills, updateBio, updateProfileImg } from "../http/userApi"

const Profile = observer(() => {
    const { user } = useContext(Context)
    const fileInputRef = useRef()

    const [profile, setProfile] = useState(null)
    const [skills, setSkills] = useState([])
    const [showInput, setShowInput] = useState(false)
    const [inputValue, setInputValue] = useState("")
    const [editBio, setEditBio] = useState(false)
    const [bioValue, setBioValue] = useState("")
    const [imgPreview, setImgPreview] = useState(null)

    useEffect(() => {
        console.log('user.user:', user.user)
        if (!user.user?.id) return
        getProfile(user.user.id)
            .then(data => {
                console.log('profile loaded:', data)
                setProfile(data)
                if (data.skills) setSkills(data.skills.split(', '))
                setBioValue(data.bio || "")
                if (data.img) setImgPreview(`${import.meta.env.VITE_API_URL}${data.img}`)
            })
            .catch(async (e) => {
                console.log('getProfile error status:', e.response?.status, e.message)
                const newProfile = await createProfile().catch(err => {
                    console.error('createProfile error:', err.response?.data || err.message)
                    return null
                })
                console.log('created profile:', newProfile)
                if (newProfile) setProfile(newProfile)
            })
    }, [user.user?.id])

    const handleAddSkill = () => {
        if (inputValue.trim()) {
            const newSkills = [...skills, inputValue.trim()]
            setSkills(newSkills)
            if (profile?.id) updateSkills(profile.id, newSkills.join(', '))
            setInputValue("")
            setShowInput(false)
        }
    }

    const handleRemoveSkill = (skillToRemove) => {
        const newSkills = skills.filter(s => s !== skillToRemove)
        setSkills(newSkills)
        if (profile?.id) updateSkills(profile.id, newSkills.join(', '))
    }

    const handleSaveBio = () => {
        if (profile?.id) updateBio(profile.id, bioValue)
        setEditBio(false)
    }

    const handleImgChange = async (e) => {
        const file = e.target.files[0]
        if (!file) return
        setImgPreview(URL.createObjectURL(file))
        if (profile?.id) {
            try {
                await updateProfileImg(profile.id, file)
            } catch (err) {
                console.error('Image upload error:', err.response?.data || err.message)
            }
        } else {
            console.error('profile is null, cannot upload')
        }
    }

    return (
        <Container className="py-5" style={{ maxWidth: 1200 }}>
            <Card className="border-0 shadow-sm">
                <Card.Body className="p-4">
                    <Row className="align-items-center g-4">
                        <Col xs="auto">
                            <div
                                style={{ position: "relative", width: 120, height: 120, cursor: "pointer" }}
                                onClick={() => fileInputRef.current.click()}
                                title="Click to change photo"
                            >
                                <Image
                                    src={imgPreview || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect width='120' height='120' fill='%23dee2e6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='40' fill='%236c757d'%3E%3F%3C/text%3E%3C/svg%3E"}
                                    height={120}
                                    width={120}
                                    roundedCircle
                                    style={{ objectFit: "cover", border: "3px solid #dee2e6" }}
                                />
                                <div style={{
                                    position: "absolute", bottom: 0, right: 0,
                                    background: "#0d6efd", borderRadius: "50%",
                                    width: 30, height: 30, display: "flex",
                                    alignItems: "center", justifyContent: "center"
                                }}>
                                    <span style={{ color: "white", fontSize: 16, lineHeight: 1 }}>+</span>
                                </div>
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={handleImgChange}
                            />
                        </Col>
                        <Col>
                            <h2 className="mb-1 fw-bold">{user.user?.username}</h2>
                            <p className="text-muted mb-2">{user.user?.email}</p>
                            <Badge bg="primary" className="text-capitalize">{user.user?.role}</Badge>
                        </Col>
                    </Row>

                    <hr className="my-4" />

                    <div className="d-flex align-items-center gap-2 mb-2">
                        <h5 className="fw-semibold mb-0">About</h5>
                        {!editBio && (
                            <Button variant="outline-secondary" size="sm" onClick={() => setEditBio(true)}>
                                Edit
                            </Button>
                        )}
                    </div>

                    {editBio ? (
                        <>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                value={bioValue}
                                onChange={(e) => setBioValue(e.target.value)}
                                className="mb-2"
                            />
                            <div className="d-flex gap-2">
                                <Button variant="primary" size="sm" onClick={handleSaveBio}>Save</Button>
                                <Button variant="outline-secondary" size="sm" onClick={() => setEditBio(false)}>Cancel</Button>
                            </div>
                        </>
                    ) : (
                        <p className="text-secondary">{bioValue || "No bio yet."}</p>
                    )}

                    <hr className="my-4" />

                    <h5 className="fw-semibold mb-3">Skills</h5>
                    <div className="d-flex flex-wrap gap-2 mb-3">
                        {skills.map((skill) => (
                            <Badge
                                key={skill}
                                bg="secondary"
                                className="fs-6 fw-normal px-3 py-2 d-flex align-items-center gap-2"
                            >
                                {skill}
                                <span
                                    onClick={() => handleRemoveSkill(skill)}
                                    style={{ cursor: "pointer", fontSize: 14, lineHeight: 1 }}
                                >
                                    &times;
                                </span>
                            </Badge>
                        ))}
                    </div>

                    {showInput && (
                        <InputGroup className="mb-2" style={{ maxWidth: 300 }}>
                            <Form.Control
                                placeholder="Add skill.."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
                            />
                            <Button variant="primary" onClick={handleAddSkill}>Add</Button>
                        </InputGroup>
                    )}

                    <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => setShowInput(!showInput)}
                        className="mt-2"
                    >
                        {showInput ? "Cancel" : "+ Add Skill"}
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    )
})

export default Profile
