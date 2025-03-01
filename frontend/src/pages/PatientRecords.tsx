const PatientRecords:any = [
    {
      id: '1',
      patientId: '1', // Corresponds to kamlesh
      medicalRecords: [
        { id: '1', title: 'Blood Pressure Report', date: '2023-05-10', uploadedBy: 'Dr. John Doe' },
        { id: '2', title: 'Cholesterol Test', date: '2023-04-25', uploadedBy: 'Dr. Jane Smith' },
      ],
      prescriptions: [
        {
          id: '1',
          doctorName: 'Dr. John Doe',
          date: '2023-05-15',
          diagnosis: 'Hypertension',
          medications: [
            { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', duration: '30 days' },
            { name: 'Amlodipine', dosage: '5mg', frequency: 'Once daily', duration: '30 days' },
          ],
          notes: 'Monitor blood pressure regularly.',
        },
      ],
      labReports: [
        { id: '1', title: 'Complete Blood Count', date: '2023-05-12', uploadedBy: 'LabCorp' },
      ],
      accessRequests: [
        { id: '1', doctorName: 'Dr. Jane Smith', date: '2023-06-01', status: 'Pending' },
      ],
    },
    {
      id: '2',
      patientId: '2', // Corresponds to rahul
      medicalRecords: [
        { id: '3', title: 'Blood Sugar Report', date: '2023-06-01', uploadedBy: 'Dr. John Doe' },
      ],
      prescriptions: [
        {
          id: '2',
          doctorName: 'Dr. Jane Smith',
          date: '2023-06-02',
          diagnosis: 'Diabetes Type 2',
          medications: [
            { name: 'Metformin', dosage: '1000mg', frequency: 'Twice daily', duration: '30 days' },
          ],
          notes: 'Monitor blood sugar levels regularly.',
        },
      ],
      labReports: [
        { id: '2', title: 'HbA1c Test', date: '2023-05-30', uploadedBy: 'Quest Diagnostics' },
      ],
      accessRequests: [
        { id: '2', doctorName: 'Dr. John Doe', date: '2023-06-05', status: 'Pending' },
      ],
    },
    {
      id: '3',
      patientId: '3', // Corresponds to rekha
      medicalRecords: [
        { id: '4', title: 'Joint X-Ray Report', date: '2023-04-25', uploadedBy: 'Dr. John Doe' },
      ],
      prescriptions: [
        {
          id: '3',
          doctorName: 'Dr. John Doe',
          date: '2023-04-28',
          diagnosis: 'Arthritis',
          medications: [
            { name: 'Ibuprofen', dosage: '400mg', frequency: 'As needed', duration: '30 days' },
          ],
          notes: 'Take medication for pain relief.',
        },
      ],
      labReports: [
        { id: '3', title: 'Rheumatoid Factor Test', date: '2023-04-20', uploadedBy: 'LabCorp' },
      ],
      accessRequests: [],
    },
    {
      id: '4',
      patientId: '4', // Corresponds to sanjay
      medicalRecords: [
        { id: '5', title: 'Pulmonary Function Test', date: '2023-06-05', uploadedBy: 'Dr. Jane Smith' },
      ],
      prescriptions: [
        {
          id: '4',
          doctorName: 'Dr. Jane Smith',
          date: '2023-06-10',
          diagnosis: 'Asthma',
          medications: [
            { name: 'Albuterol', dosage: '90mcg', frequency: 'As needed', duration: '30 days' },
          ],
          notes: 'Use inhaler during asthma attacks.',
        },
      ],
      labReports: [
        { id: '4', title: 'Allergy Test', date: '2023-06-08', uploadedBy: 'Quest Diagnostics' },
      ],
      accessRequests: [],
    },
    {
      id: '5',
      patientId: '5', // Corresponds to mangal
      medicalRecords: [
        { id: '6', title: 'Echocardiogram Report', date: '2023-05-20', uploadedBy: 'Dr. John Doe' },
      ],
      prescriptions: [
        {
          id: '5',
          doctorName: 'Dr. John Doe',
          date: '2023-05-22',
          diagnosis: 'Coronary Artery Disease',
          medications: [
            { name: 'Atorvastatin', dosage: '20mg', frequency: 'Once daily', duration: '30 days' },
            { name: 'Aspirin', dosage: '81mg', frequency: 'Once daily', duration: '30 days' },
          ],
          notes: 'Take medications as prescribed and follow a heart-healthy diet.',
        },
      ],
      labReports: [
        { id: '5', title: 'Lipid Panel', date: '2023-05-18', uploadedBy: 'LabCorp' },
      ],
      accessRequests: [
        { id: '3', doctorName: 'Dr. Jane Smith', date: '2023-06-12', status: 'Pending' },
      ],
    },
  ];
  
  export default PatientRecords;