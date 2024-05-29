import React, { useState } from "react";
import PropTypes from 'prop-types';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Button from '../../components/inputs/Button';
import RadioInput from "../../components/inputs/Radio";
import SelectInput from '../../components/inputs/Select';
import { BsAsterisk } from 'react-icons/bs';
import Logo from '../../assets/SCC logo.png';
import week from "../../data/weeks";
import names from "../../data/names";
import TextInput from "../../components/inputs/Text";


const Home = () => {
  const url = 'https://script.google.com/macros/s/AKfycbxOvy98R0vb6lX3NkQpjbDNIR6ZvE4JakdWR_a3ZGWjObv2Ra7Hc6c86SGirksNTgPx_A/exec'
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    week: {},
    names: {},
    sundayService: '',
    midWeekService: '',
    fellowshipMeeting: '',
    studyGroup: '',
    prayerGroup: '',
    evangelism: ''
  });

  const handleChange = (value, type, name) => {
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value
    }));
  };


  console.log(form, "form");

  const validateForm = () => {
    return form.week && form.names && (form.names.value !== 'Others' || form.otherNames) && form.sundayService && form.midWeekService && form.fellowshipMeeting && form.studyGroup && form.prayerGroup && form.evangelism;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please fill out all fields.', {
        position: "top-center",
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true,
        theme: "light"
      });
      return;
    }
    setLoading(true)
    console.log(form);

    const body = new FormData()
    const weekNo = form?.week?.value === "Week 1" ? 1 : form?.week?.value === "Week 2" ? 2 : form?.week?.value === "Week 3" ? 3 : form?.week?.value === "Week 4" ? 4 : form?.week?.value === "Week 5" ? 5 : null
    // body.append('Select Week', form?.week?.value)
    // body.append(`Name ${weekNo}`, form?.names?.value)

    body.append(
      'Name',
      form?.names?.value === 'Others' ? form?.otherNames : form?.names?.value 
    );

    body.append(`SUNDAY SERVICE ${weekNo}`, form?.sundayService === "Yes" ? 1 : 0)
    body.append(`MID WEEK SERVICE ${weekNo}`, form?.midWeekService === "Yes" ? 1 : 0)
    body.append(`FELLOWSHIP MEETING ${weekNo}`, form?.fellowshipMeeting === "Yes" ? 1 : 0)
    body.append(`STUDY GROUP ${weekNo}`, form?.studyGroup === "Yes" ? 1 : 0)
    body.append(`PRAYER GROUP ${weekNo}`, form?.prayerGroup === "Yes" ? 1 : 0)
    body.append(`EVANGELISM ${weekNo}`, form?.evangelism === "Yes" ? 1 : 0)
    
    await fetch(
      url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body,
        'mode': 'no-cors'
      }
    )
      .then((response) => {
        console.log("Response", response)
        setLoading(false)
        toast.success('Attendance Marked.', {
          position: "top-center",
          autoClose: 3000,
          pauseOnHover: true,
          draggable: true,
          theme: "light"
        });
        setForm()
      })
      .catch((error) => {
        console.log("Error", error)
      })
  };

  return (
    <>
      <section
        className="relative w-full min-h-screen !bg-cover pt-20 pb-40"
        style={{ background: `no-repeat center #131718` }}
      >
        <div className="content">
          <div className="flex justify-center mb-20 mt-0">
            <img src={Logo} className="w-80 h-auto" alt="Saint community church Logo" />
          </div>
        </div>

        <div className={`w-full max-w-2xl mx-auto bg-[#f2f5f8] px-10 pt-14 pb-20`}>
          <div className="w-full">
            <div className="w-full text-center mb-10">
              <h2 className="text-3xl">Attendance Report</h2>
              <p className="opacity-70">Please kindly provide accurate data for the attendance report.</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="w-full">
                <SelectInput
                  className="mb-5"
                  label="Select Week"
                  isRequired
                  name="week"
                  value={form?.week}
                  onChange={(val) => handleChange(val, 'select', 'week')}
                  placeholder="Week"
                  options={week || []}
                />

                <SelectInput
                  className="mb-5"
                  label="Name"
                  isRequired
                  name="names"
                  value={form?.names}
                  onChange={(val) => handleChange(val, 'select', 'names')}
                  placeholder="Select your name"
                  options={names || []}
                />
                {form?.names?.value === 'Others' && (
                  <TextInput
                    className="mb-5"
                    isRequired
                    label="Enter your name"
                    name="otherNames"
                    value={form?.otherNames || ''}
                    onChange={(e) => handleChange(e.target.value, 'text', 'otherNames')}
                    placeholder="Please enter your name"
                  />
                )}
                <div className="block sm:flex sm:gap-52 ">
                  <div className="mb-5">
                    <p className="mb-2">
                      SUNDAY SERVICE
                      <BsAsterisk className="text-[#CD2128] w-2 h-auto inline mb-3" />
                    </p>
                    <div className="flex space-x-6">
                      <RadioInput
                        name="sundayService"
                        label="Yes"
                        value="Yes"
                        onChange={(e) => handleChange(e.target.value, 'radio', 'sundayService')}
                        checked={form?.sundayService === 'Yes'}
                      />
                      <RadioInput
                        name="sundayService"
                        label="No"
                        value="No"
                        onChange={(e) => handleChange(e.target.value, 'radio', 'sundayService')}
                        checked={form?.sundayService === 'No'}
                      />
                    </div>
                  </div>
                  <div className="mb-5">
                    <p className="mb-2">
                      MID WEEK SERVICE
                      <BsAsterisk className="text-[#CD2128] w-2 h-auto inline mb-3" />
                    </p>
                    <div className="flex space-x-6">
                      <RadioInput
                        name="midWeekService"
                        label="Yes"
                        value="Yes"
                        onChange={(e) => handleChange(e.target.value, 'radio', 'midWeekService')}
                        checked={form?.midWeekService === 'Yes'}
                      />
                      <RadioInput
                        name="midWeekService"
                        label="No"
                        value="No"
                        onChange={(e) => handleChange(e.target.value, 'radio', 'midWeekService')}
                        checked={form?.midWeekService === 'No'}
                      />
                    </div>
                  </div>
                </div>

                <div className="block sm:flex sm:gap-56">
                  <div className="mb-5">
                    <p className="mb-2">
                      STUDY GROUP
                      <BsAsterisk className="text-[#CD2128] w-2 h-auto inline mb-3" />
                    </p>
                    <div className="flex space-x-6">
                      <RadioInput
                        name="studyGroup"
                        label="Yes"
                        value="Yes"
                        onChange={(e) => handleChange(e.target.value, 'radio', 'studyGroup')}
                        checked={form?.studyGroup === 'Yes'}
                      />
                      <RadioInput
                        name="studyGroup"
                        label="No"
                        value="No"
                        onChange={(e) => handleChange(e.target.value, 'radio', 'studyGroup')}
                        checked={form?.studyGroup === 'No'}
                      />
                    </div>
                  </div>

                  <div className="mb-5">
                    <p className="mb-2">
                      PRAYER GROUP
                      <BsAsterisk className="text-[#CD2128] w-2 h-auto inline mb-3" />
                    </p>
                    <div className="flex space-x-6">
                      <RadioInput
                        name="prayerGroup"
                        label="Yes"
                        value="Yes"
                        onChange={(e) => handleChange(e.target.value, 'radio', 'prayerGroup')}
                        checked={form?.prayerGroup === 'Yes'}
                      />
                      <RadioInput
                        name="prayerGroup"
                        label="No"
                        value="No"
                        onChange={(e) => handleChange(e.target.value, 'radio', 'prayerGroup')}
                        checked={form?.prayerGroup === 'No'}
                      />
                    </div>
                  </div>

                </div>

                <div className="block sm:flex sm:gap-40">
                  <div className="mb-5">
                    <p className="mb-2">
                      FELLOWSHIP MEETING
                      <BsAsterisk className="text-[#CD2128] w-2 h-auto inline mb-3" />
                    </p>
                    <div className="flex space-x-6">
                      <RadioInput
                        name="fellowshipMeeting"
                        label="Yes"
                        value="Yes"
                        onChange={(e) => handleChange(e.target.value, 'radio', 'fellowshipMeeting')}
                        checked={form?.fellowshipMeeting === 'Yes'}
                      />
                      <RadioInput
                        name="fellowshipMeeting"
                        label="No"
                        value="No"
                        onChange={(e) => handleChange(e.target.value, 'radio', 'fellowshipMeeting')}
                        checked={form?.fellowshipMeeting === 'No'}
                      />
                    </div>
                  </div>
                  <div className="mb-5">
                    <p className="mb-2">
                      EVANGELISM
                      <BsAsterisk className="text-[#CD2128] w-2 h-auto inline mb-3" />
                    </p>
                    <div className="flex space-x-6">
                      <RadioInput
                        name="evangelism"
                        label="Yes"
                        value="Yes"
                        onChange={(e) => handleChange(e.target.value, 'radio', 'evangelism')}
                        checked={form?.evangelism === 'Yes'}
                      />
                      <RadioInput
                        name="evangelism"
                        label="No"
                        value="No"
                        onChange={(e) => handleChange(e.target.value, 'radio', 'evangelism')}
                        checked={form?.evangelism === 'No'}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <Button type="submit" fullWidth className="mt-14 bg-[#F71011] text-white">
                {loading ? 'Submitting...' : 'Submit'}
                <ToastContainer />
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

Home.propTypes = {
  form: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Home;
