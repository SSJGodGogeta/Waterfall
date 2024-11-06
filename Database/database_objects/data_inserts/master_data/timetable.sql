--liquibase formatted sql
--changeset arman:ar1 runOnChange:true
INSERT INTO timetable (
                       date, weekday, start, end, pause_minutes, performed_hours, difference_performed_target, abscence, staff_id
) VALUES (
             '2024-11-01',                     -- Example date
             DAYNAME('2024-11-01'),            -- Automatically calculates the weekday
             '2024-11-01 09:00:00',            -- Start time
             '2024-11-01 17:00:00',            -- End time
             0,                               -- Pause in minutes
             0,                              -- Performed hours (8 hours minus 1-hour break)
             -8,                             -- Difference performed vs. target (assumes target is 8)
             'SICK',                           -- Absence type; Need to be the same as in Absence_TypeTechcode!
             5                                 -- Staff ID of Arman
         );

