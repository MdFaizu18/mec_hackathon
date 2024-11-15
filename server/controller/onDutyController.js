import OnDutyFormModel from "../models/onDutyModel.js";
import NotificationModel from "../models/notificationModel.js";
export const createOnDutyForm = async (req, res) => {
    try {
        const {
            studentName,
            studentId,
            course,
            semester,
            reason,
            dateFrom,
            dateTo,
            contactNumber,
        } = req.body;

        // Check if all fields are provided
        if (!studentName || !studentId || !course || !semester || !reason || !dateFrom || !dateTo || !contactNumber) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Validate date format (yyyy-mm-dd)
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(dateFrom) || !dateRegex.test(dateTo)) {
            return res.status(400).json({ error: 'Dates must be in yyyy-mm-dd format.' });
        }

        // Parse dates and validate logical order
        const fromDate = new Date(dateFrom);
        const toDate = new Date(dateTo);

        if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
            return res.status(400).json({ error: 'Invalid date values provided.' });
        }

        if (fromDate >= toDate) {
            return res.status(400).json({ error: 'dateFrom must be earlier than dateTo.' });
        }

        // Validate contact number
        if (!/^\d{10}$/.test(contactNumber)) {
            return res.status(400).json({ error: 'Contact number must be a valid 10-digit number.' });
        }

        // Create the On-Duty form
        const newOnDutyForm = await OnDutyFormModel.create({
            studentName,
            studentId,
            course,
            semester,
            reason,
            dateFrom,
            dateTo,
            contactNumber,
            createdBy: req.user.userId, // Store the ID of the user creating the form
        });

        // Create a notification for staff
        await NotificationModel.create({
            message: `New On-Duty form submitted by ${studentName} (ID: ${studentId})`,
            userId: req.user.userId, // Assuming staff will see it
        });

        res.status(201).json(newOnDutyForm);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update On-Duty Form Status
export const updateOnDutyStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const currentUser = req.user;

        // Find the On-Duty form by ID
        const onDutyForm = await OnDutyFormModel.findById(id);
        console.log(onDutyForm);

        if (!onDutyForm) {
            return res.status(404).json({ message: "On-Duty Form not found" });
        }

        // Update status based on the role of the user
        if (currentUser.role === "admin" && onDutyForm.status === "Pending") {
            onDutyForm.status = "Processing";
        } else if (
            currentUser.role === "head" &&
            onDutyForm.status === "Processing"
        ) {
            onDutyForm.status = "Approved";
        } else {
            return res
                .status(403)
                .json({ message: "Unauthorized action or invalid status update" });
        }

        // Save the updated form
        await onDutyForm.save();

        // Create notification based on the status
        const notificationMessage =
            onDutyForm.status === "Processing"
                ? `On-Duty form by ${onDutyForm.studentName} is now in process by staff.`
                : `On-Duty form by ${onDutyForm.studentName} has been approved by HOD.`;

        await NotificationModel.create({
            message: notificationMessage,
            userId: onDutyForm.createdBy, // Notify the student who submitted the form
        });

        res.status(200).json({ message: `Status updated to ${onDutyForm.status}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get All On-Duty Forms
export const getAllOnDutyForms = async (req, res) => {
    try {
        const allOnDutyForms = await OnDutyFormModel.find();
        res.status(200).json(allOnDutyForms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get On-Duty Form by ID
export const getOnDutyFormById = async (req, res) => {
    try {
        const { id } = req.params;
        const onDutyForm = await OnDutyFormModel.findById(id);
        if (!onDutyForm) {
            return res.status(404).json({ message: "On-Duty Form not found" });
        }
        res.status(200).json(onDutyForm);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete On-Duty Form
export const deleteOnDutyForm = async (req, res) => {
    try {
        const { id } = req.params;
        const onDutyForm = await OnDutyFormModel.findByIdAndDelete(id);
        if (!onDutyForm) {
            return res.status(404).json({ message: "On-Duty Form not found" });
        }

        // Create a notification for the student
        await NotificationModel.create({
            message: `Your On-Duty form has been deleted by staff.`,
            userId: onDutyForm.createdBy,
        });

        res.status(200).json({ message: "Form deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};