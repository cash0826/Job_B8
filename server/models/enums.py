from enum import Enum

# Enum Class for Job Status
class JobStatus(Enum):
  SAVED = "Saved"
  APPLIED = "Applied"
  NOT_SELECTED = "Not Selected"
  ASSESSMENT = "Assessment"
  INTERVIEWING = "Interviewing"
  JOB_OFFER = "Job Offer"
  
  @classmethod
  def allowed_transitions(cls):
    return {
      cls.SAVED: {cls.APPLIED},
      cls.APPLIED: {cls.ASSESSMENT, cls.NOT_SELECTED},
      cls.ASSESSMENT: {cls.INTERVIEWING, cls.NOT_SELECTED},
      cls.INTERVIEWING: {cls.JOB_OFFER, cls.NOT_SELECTED},
      cls.JOB_OFFER: set(), # terminal state
      cls.NOT_SELECTED: set(), # terminal state
    }
    
  @classmethod
  def can_transition(cls, old, new):
    return new in cls.allowed_transitions().get(old, set())
  
# Single Source of truth for allowed transitions, easy validation and prevents impossible jumps